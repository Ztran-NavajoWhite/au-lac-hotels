<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\OnePayService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    protected OnePayService $onePayService;

    public function __construct(OnePayService $onePayService)
    {
        $this->onePayService = $onePayService;
    }

    /**
     * Handle OnePay IPN (Instant Payment Notification).
     */
    public function onePayIPN(Request $request): JsonResponse
    {
        Log::info('OnePay IPN received', $request->all());

        $success = $this->onePayService->processIPN($request->all());

        if ($success) {
            return response()->json(['status' => 'OK']);
        }

        return response()->json(['status' => 'FAILED'], 400);
    }

    /**
     * Handle OnePay payment return.
     */
    public function onePayReturn(Request $request): JsonResponse
    {
        Log::info('OnePay return received', $request->all());

        $verification = $this->onePayService->verifyPaymentResponse($request->all());

        if ($verification['success']) {
            return response()->json([
                'success' => true,
                'message' => 'Payment successful',
                'data' => $verification
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Payment failed',
            'data' => $verification
        ], 400);
    }

    /**
     * Handle OnePay payment cancellation.
     */
    public function onePayCancel(Request $request): JsonResponse
    {
        Log::info('OnePay cancellation received', $request->all());

        return response()->json([
            'success' => false,
            'message' => 'Payment was cancelled by user'
        ]);
    }
}
