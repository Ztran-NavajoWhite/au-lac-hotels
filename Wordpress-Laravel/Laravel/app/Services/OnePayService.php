<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class OnePayService
{
    protected string $merchantId;
    protected string $accessCode;
    protected string $secureHash;
    protected string $baseUrl;
    protected bool $isTest;

    public function __construct()
    {
        $this->merchantId = config('services.onepay.merchant_id');
        $this->accessCode = config('services.onepay.access_code');
        $this->secureHash = config('services.onepay.secure_hash');
        $this->baseUrl = config('services.onepay.base_url');
        $this->isTest = config('services.onepay.test_mode', true);
    }

    /**
     * Create a payment URL for OnePay.
     */
    public function createPaymentUrl(Booking $booking, string $returnUrl, string $cancelUrl): string
    {
        $payment = $this->createPaymentRecord($booking);
        
        $params = [
            'vpc_MerchantId' => $this->merchantId,
            'vpc_AccessCode' => $this->accessCode,
            'vpc_MerchTxnRef' => $payment->payment_reference,
            'vpc_OrderInfo' => "Booking {$booking->booking_reference}",
            'vpc_Amount' => (int)($payment->amount * 100), // Convert to cents
            'vpc_Currency' => $payment->currency,
            'vpc_ReturnURL' => $returnUrl,
            'vpc_CancelURL' => $cancelUrl,
            'vpc_TicketNo' => request()->ip(),
            'vpc_Locale' => 'vn',
            'vpc_Version' => '2',
        ];

        // Add test parameters if in test mode
        if ($this->isTest) {
            $params['vpc_Command'] = 'pay';
        }

        $params['vpc_SecureHash'] = $this->generateSecureHash($params);

        $queryString = http_build_query($params);
        
        return "{$this->baseUrl}/onecomm-pay/vpc.op?" . $queryString;
    }

    /**
     * Verify payment response from OnePay.
     */
    public function verifyPaymentResponse(array $response): array
    {
        $receivedHash = $response['vpc_SecureHash'] ?? '';
        $calculatedHash = $this->generateSecureHash($response);

        if ($receivedHash !== $calculatedHash) {
            Log::error('OnePay hash verification failed', [
                'received' => $receivedHash,
                'calculated' => $calculatedHash,
                'response' => $response
            ]);
            
            return [
                'success' => false,
                'message' => 'Invalid payment response',
                'error' => 'HASH_VERIFICATION_FAILED'
            ];
        }

        $responseCode = $response['vpc_ResponseCode'] ?? '';
        $transactionId = $response['vpc_TransactionNo'] ?? '';
        $merchTxnRef = $response['vpc_MerchTxnRef'] ?? '';

        if ($responseCode === '0') {
            return [
                'success' => true,
                'message' => 'Payment successful',
                'transaction_id' => $transactionId,
                'payment_reference' => $merchTxnRef
            ];
        }

        return [
            'success' => false,
            'message' => $this->getResponseMessage($responseCode),
            'error' => $responseCode,
            'transaction_id' => $transactionId,
            'payment_reference' => $merchTxnRef
        ];
    }

    /**
     * Process IPN (Instant Payment Notification) from OnePay.
     */
    public function processIPN(array $data): bool
    {
        try {
            $verification = $this->verifyPaymentResponse($data);
            
            if (!$verification['success']) {
                Log::error('OnePay IPN verification failed', $verification);
                return false;
            }

            $payment = Payment::where('payment_reference', $verification['payment_reference'])->first();
            
            if (!$payment) {
                Log::error('Payment not found for IPN', $verification);
                return false;
            }

            if ($verification['success']) {
                $payment->update([
                    'status' => 'completed',
                    'gateway_transaction_id' => $verification['transaction_id'],
                    'gateway_response' => $data,
                    'processed_at' => now(),
                ]);

                // Update booking status
                $payment->booking->update([
                    'status' => 'confirmed',
                    'payment_status' => 'paid',
                    'confirmed_at' => now(),
                ]);

                Log::info('Payment completed successfully', [
                    'payment_id' => $payment->id,
                    'transaction_id' => $verification['transaction_id']
                ]);
            } else {
                $payment->update([
                    'status' => 'failed',
                    'gateway_response' => $data,
                    'failed_at' => now(),
                    'failure_reason' => $verification['message'],
                ]);

                Log::error('Payment failed', [
                    'payment_id' => $payment->id,
                    'error' => $verification['error']
                ]);
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Error processing OnePay IPN', [
                'error' => $e->getMessage(),
                'data' => $data
            ]);
            return false;
        }
    }

    /**
     * Generate secure hash for OnePay.
     */
    protected function generateSecureHash(array $params): string
    {
        // Remove hash and empty values
        unset($params['vpc_SecureHash']);
        $params = array_filter($params, fn($value) => $value !== '' && $value !== null);

        // Sort parameters alphabetically
        ksort($params);

        // Create hash data
        $hashData = '';
        foreach ($params as $key => $value) {
            $hashData .= $key . '=' . $value . '&';
        }
        $hashData = rtrim($hashData, '&');

        // Generate HMAC SHA256
        return strtoupper(hash_hmac('sha256', $hashData, $this->secureHash));
    }

    /**
     * Create payment record for a booking.
     */
    protected function createPaymentRecord(Booking $booking): Payment
    {
        return Payment::create([
            'booking_id' => $booking->id,
            'payment_reference' => 'PAY' . time() . Str::random(6),
            'amount' => $booking->final_amount,
            'currency' => 'VND',
            'status' => 'pending',
            'payment_method' => 'onepay',
        ]);
    }

    /**
     * Get response message from OnePay response code.
     */
    protected function getResponseMessage(string $responseCode): string
    {
        $messages = [
            '0' => 'Approved',
            '1' => 'Bank Declined',
            '2' => 'Bank Declined',
            '3' => 'Bank Declined',
            '4' => 'Bank Declined',
            '5' => 'Bank Declined',
            '6' => 'Bank Declined',
            '7' => 'Bank Declined',
            '8' => 'Bank Declined',
            '9' => 'Bank Declined',
            'A' => 'Bank Declined',
            'B' => 'Bank Declined',
            'C' => 'Bank Declined',
            'D' => 'Bank Declined',
            'E' => 'Bank Declined',
            'F' => 'Bank Declined',
            'G' => 'Bank Declined',
            'H' => 'Bank Declined',
            'I' => 'Bank Declined',
            'J' => 'Bank Declined',
            'K' => 'Bank Declined',
            'L' => 'Bank Declined',
            'M' => 'Bank Declined',
            'N' => 'Bank Declined',
            'O' => 'Bank Declined',
            'P' => 'Bank Declined',
            'Q' => 'Bank Declined',
            'R' => 'Bank Declined',
            'S' => 'Bank Declined',
            'T' => 'Bank Declined',
            'U' => 'Bank Declined',
            'V' => 'Bank Declined',
            'W' => 'Bank Declined',
            'X' => 'Bank Declined',
            'Y' => 'Bank Declined',
            'Z' => 'Bank Declined',
        ];

        return $messages[$responseCode] ?? 'Unknown response code';
    }
}
