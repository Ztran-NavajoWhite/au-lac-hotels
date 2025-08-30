<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Booking API Routes
Route::prefix('bookings')->group(function () {
    Route::get('/hotels', [BookingController::class, 'getHotels']);
    Route::get('/hotels/{id}', [BookingController::class, 'getHotel']);
    Route::post('/check-availability', [BookingController::class, 'checkAvailability']);
    Route::post('/create', [BookingController::class, 'createBooking']);
    Route::get('/{reference}', [BookingController::class, 'getBooking']);
    Route::post('/{reference}/cancel', [BookingController::class, 'cancelBooking']);
});

// Payment API Routes
Route::prefix('payments')->group(function () {
    Route::post('/onepay/ipn', [PaymentController::class, 'onePayIPN']);
    Route::get('/onepay/return', [PaymentController::class, 'onePayReturn']);
    Route::get('/onepay/cancel', [PaymentController::class, 'onePayCancel']);
});
