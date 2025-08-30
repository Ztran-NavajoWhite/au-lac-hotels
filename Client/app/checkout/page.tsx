'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const hotelId = searchParams.get('hotel')
  const roomId = searchParams.get('room')
  const guests = searchParams.get('guests')
  const total = searchParams.get('total')

  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [acceptTerms, setAcceptTerms] = useState(false)

  // Mock booking data - in real app this would come from previous pages or API
  const bookingData = {
    hotel: 'Au Lac Legend Hotel',
    room: 'Deluxe Room',
    checkIn: 'Dec 25, 2024',
    checkOut: 'Dec 28, 2024',
    nights: 3,
    guests: parseInt(guests || '2'),
    roomPrice: 250,
    total: parseInt(total || '750'),
    taxes: 75,
    fees: 25,
    grandTotal: parseInt(total || '750') + 75 + 25
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
              <p className="text-gray-600 mt-2">Complete your booking and secure your stay</p>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="text-blue-600 font-medium">Search</span>
              <span>→</span>
              <span className="text-blue-600 font-medium">Booking</span>
              <span>→</span>
              <span className="text-blue-600 font-medium">Checkout</span>
              <span>→</span>
              <span>Confirmation</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
              
              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">PayPal</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Bank Transfer</span>
                  </label>
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* PayPal Form */}
              {paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <div className="text-blue-600 text-4xl mb-4">💳</div>
                  <p className="text-gray-600">You will be redirected to PayPal to complete your payment</p>
                </div>
              )}

              {/* Bank Transfer Form */}
              {paymentMethod === 'bank' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    <input
                      type="text"
                      placeholder="1234567890"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <input
                      type="text"
                      placeholder="Bank Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="SG">Singapore</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                  required
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                  . I understand that this booking is subject to our cancellation policy.
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hotel</span>
                  <span className="font-medium">{bookingData.hotel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room</span>
                  <span className="font-medium">{bookingData.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in</span>
                  <span className="font-medium">{bookingData.checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out</span>
                  <span className="font-medium">{bookingData.checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nights</span>
                  <span className="font-medium">{bookingData.nights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-medium">{bookingData.guests}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Rate</span>
                    <span>${bookingData.roomPrice} × {bookingData.nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${bookingData.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span>${bookingData.taxes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fees</span>
                    <span>${bookingData.fees}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-green-600">${bookingData.grandTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link
                href={`/confirmed?hotel=${hotelId}&room=${roomId}&total=${bookingData.grandTotal}`}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-center block transition-colors ${
                  acceptTerms
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={(e) => {
                  if (!acceptTerms) {
                    e.preventDefault()
                    alert('Please accept the terms and conditions to continue')
                  }
                }}
              >
                Confirm Booking
              </Link>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                By clicking "Confirm Booking", you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
