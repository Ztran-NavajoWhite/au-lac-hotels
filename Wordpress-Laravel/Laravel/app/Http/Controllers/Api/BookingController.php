<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Hotel;
use App\Models\RoomType;
use App\Services\OnePayService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    protected OnePayService $onePayService;

    public function __construct(OnePayService $onePayService)
    {
        $this->onePayService = $onePayService;
    }

    /**
     * Get available hotels.
     */
    public function getHotels(): JsonResponse
    {
        $hotels = Hotel::active()
            ->with(['roomTypes' => function ($query) {
                $query->active();
            }])
            ->get();

        return response()->json([
            'success' => true,
            'data' => $hotels
        ]);
    }

    /**
     * Get hotel details with room types.
     */
    public function getHotel(int $id): JsonResponse
    {
        $hotel = Hotel::active()
            ->with(['roomTypes' => function ($query) {
                $query->active();
            }])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $hotel
        ]);
    }

    /**
     * Check room availability.
     */
    public function checkAvailability(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'hotel_id' => 'required|exists:hotels,id',
            'room_type_id' => 'required|exists:room_types,id',
            'check_in_date' => 'required|date|after:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'guests' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $roomType = RoomType::findOrFail($request->room_type_id);
        
        // Check if room type belongs to the specified hotel
        if ($roomType->hotel_id != $request->hotel_id) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid room type for this hotel'
            ], 400);
        }

        // Check capacity
        if ($roomType->capacity < $request->guests) {
            return response()->json([
                'success' => false,
                'message' => 'Room capacity is insufficient for the number of guests'
            ], 400);
        }

        // Check availability for the date range
        $conflictingBookings = Booking::where('room_type_id', $request->room_type_id)
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($request) {
                $query->whereBetween('check_in_date', [$request->check_in_date, $request->check_out_date])
                    ->orWhereBetween('check_out_date', [$request->check_in_date, $request->check_out_date])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('check_in_date', '<=', $request->check_in_date)
                            ->where('check_out_date', '>=', $request->check_out_date);
                    });
            })
            ->count();

        $isAvailable = $conflictingBookings === 0;

        // Calculate total amount
        $nights = \Carbon\Carbon::parse($request->check_in_date)
            ->diffInDays($request->check_out_date);
        $totalAmount = $roomType->base_price * $nights;

        return response()->json([
            'success' => true,
            'data' => [
                'is_available' => $isAvailable,
                'room_type' => $roomType,
                'nights' => $nights,
                'base_price_per_night' => $roomType->base_price,
                'total_amount' => $totalAmount,
                'tax_amount' => 0, // Add tax calculation logic if needed
                'final_amount' => $totalAmount,
            ]
        ]);
    }

    /**
     * Create a new booking.
     */
    public function createBooking(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'hotel_id' => 'required|exists:hotels,id',
            'room_type_id' => 'required|exists:room_types,id',
            'check_in_date' => 'required|date|after:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'guests' => 'required|integer|min:1',
            'guest_details' => 'required|array',
            'guest_details.full_name' => 'required|string',
            'guest_details.email' => 'required|email',
            'guest_details.phone' => 'required|string',
            'special_requests' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Check availability again
            $availability = $this->checkAvailability($request);
            $availabilityData = json_decode($availability->getContent(), true);
            
            if (!$availabilityData['data']['is_available']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Room is not available for the selected dates'
                ], 400);
            }

            // Create booking
            $booking = Booking::create([
                'booking_reference' => Booking::generateReference(),
                'user_id' => auth()->id(), // If user is authenticated
                'hotel_id' => $request->hotel_id,
                'room_type_id' => $request->room_type_id,
                'check_in_date' => $request->check_in_date,
                'check_out_date' => $request->check_out_date,
                'guests' => $request->guests,
                'total_amount' => $availabilityData['data']['total_amount'],
                'tax_amount' => $availabilityData['data']['tax_amount'],
                'discount_amount' => 0,
                'final_amount' => $availabilityData['data']['final_amount'],
                'status' => 'pending',
                'payment_status' => 'pending',
                'guest_details' => $request->guest_details,
                'special_requests' => $request->special_requests,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Booking created successfully',
                'data' => [
                    'booking' => $booking,
                    'payment_url' => $this->onePayService->createPaymentUrl(
                        $booking,
                        route('payment.return'),
                        route('payment.cancel')
                    )
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get booking details.
     */
    public function getBooking(string $reference): JsonResponse
    {
        $booking = Booking::where('booking_reference', $reference)
            ->with(['hotel', 'roomType', 'payment'])
            ->first();

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $booking
        ]);
    }

    /**
     * Cancel a booking.
     */
    public function cancelBooking(string $reference): JsonResponse
    {
        $booking = Booking::where('booking_reference', $reference)->first();

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not found'
            ], 404);
        }

        if (!$booking->canBeCancelled()) {
            return response()->json([
                'success' => false,
                'message' => 'Booking cannot be cancelled'
            ], 400);
        }

        $booking->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Booking cancelled successfully'
        ]);
    }
}
