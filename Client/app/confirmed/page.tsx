'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ConfirmedPage() {
  const searchParams = useSearchParams()
  const hotelId = searchParams.get('hotel')
  const roomId = searchParams.get('room')
  const total = searchParams.get('total')

  // Generate a random booking reference
  const bookingRef = `AL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  // Mock booking data - in real app this would come from the completed transaction
  const bookingData = {
    hotel: 'Au Lac Legend Hotel',
    room: 'Deluxe Room',
    checkIn: 'Dec 25, 2024',
    checkOut: 'Dec 28, 2024',
    nights: 3,
    guests: 2,
    total: parseInt(total || '850'),
    bookingRef: bookingRef,
    guestName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Your stay at {bookingData.hotel} has been successfully booked. We've sent a confirmation email with all the details.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Details</h2>
            <p className="text-gray-600">Keep this information for your records</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Booking Reference</h3>
                <p className="text-2xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
                  {bookingData.bookingRef}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hotel</h3>
                <p className="text-gray-700">{bookingData.hotel}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Room Type</h3>
                <p className="text-gray-700">{bookingData.room}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Check-in</h3>
                <p className="text-gray-700">{bookingData.checkIn}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Check-out</h3>
                <p className="text-gray-700">{bookingData.checkOut}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                <p className="text-gray-700">{bookingData.nights} nights</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Guests</h3>
                <p className="text-gray-700">{bookingData.guests} guests</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Total Amount</h3>
                <p className="text-2xl font-bold text-green-600">${bookingData.total}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Guest Name</h3>
                <p className="text-gray-700">{bookingData.guestName}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Email</h3>
                <p className="text-gray-700">{bookingData.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Happens Next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">📧</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Confirmation Email</h3>
              <p className="text-gray-600 text-sm">
                You'll receive a detailed confirmation email within the next few minutes
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pre-Arrival Contact</h3>
              <p className="text-gray-600 text-sm">
                Our team will contact you 24 hours before check-in to confirm your arrival
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🏨</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Check-in</h3>
              <p className="text-gray-600 text-sm">
                Check-in time is 3:00 PM. Early check-in may be available upon request
              </p>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Information</h3>
          <ul className="space-y-2 text-yellow-700">
            <li>• Please bring a valid ID and the credit card used for booking</li>
            <li>• Check-in time: 3:00 PM | Check-out time: 11:00 AM</li>
            <li>• Free cancellation up to 24 hours before check-in</li>
            <li>• Contact us at +1 (555) 123-4567 for any changes</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Return to Homepage
            </Link>
            <Link
              href="/hotels"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore More Hotels
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              🖨️ Print Confirmation
            </button>
            <button
              onClick={() => {
                const text = `Booking Confirmation\n\nReference: ${bookingData.bookingRef}\nHotel: ${bookingData.hotel}\nRoom: ${bookingData.room}\nCheck-in: ${bookingData.checkIn}\nCheck-out: ${bookingData.checkOut}\nTotal: $${bookingData.total}`;
                navigator.clipboard.writeText(text);
                alert('Booking details copied to clipboard!');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              📋 Copy Details
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gray-100 rounded-lg p-6 mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our customer service team is available 24/7 to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              📞 +1 (555) 123-4567
            </a>
            <a
              href="mailto:support@aulachotels.com"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ✉️ support@aulachotels.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
