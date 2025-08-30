'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function BookingPage() {
  const searchParams = useSearchParams()
  const hotelId = searchParams.get('hotel')
  const hotelName = searchParams.get('name')

  const [selectedRoom, setSelectedRoom] = useState('')
  const [guestCount, setGuestCount] = useState(2)
  const [specialRequests, setSpecialRequests] = useState('')

  // Mock hotel data - in real app this would come from API
  const hotelData = {
    id: hotelId || '1',
    name: hotelName || 'Au Lac Legend Hotel',
    location: 'Business District',
    checkIn: 'Dec 25, 2024',
    checkOut: 'Dec 28, 2024',
    nights: 3,
    rooms: [
      {
        id: 'room1',
        name: 'Deluxe Room',
        description: 'Spacious room with city views and premium amenities',
        price: 250,
        capacity: 2,
        available: 5,
        amenities: ['City View', 'King Bed', 'Marble Bathroom', 'Work Desk', 'Mini Bar']
      },
      {
        id: 'room2',
        name: 'Executive Suite',
        description: 'Luxurious suite with separate living area',
        price: 450,
        capacity: 3,
        available: 3,
        amenities: ['Living Room', 'King Bed', 'Executive Lounge Access', 'Butler Service']
      },
      {
        id: 'room3',
        name: 'Presidential Suite',
        description: 'Our most prestigious accommodation',
        price: 1200,
        capacity: 4,
        available: 1,
        amenities: ['Panoramic Views', 'Private Terrace', 'Dining Room', '24/7 Butler']
      }
    ]
  }

  const selectedRoomData = hotelData.rooms.find(room => room.id === selectedRoom)
  const totalPrice = selectedRoomData ? selectedRoomData.price * hotelData.nights : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
              <p className="text-gray-600 mt-2">{hotelData.name} • {hotelData.location}</p>
            </div>
            
            {/* Booking Summary */}
            <div className="text-right text-sm text-gray-600">
              <p>Check-in: <span className="font-medium">{hotelData.checkIn}</span></p>
              <p>Check-out: <span className="font-medium">{hotelData.checkOut}</span></p>
              <p>Duration: <span className="font-medium">{hotelData.nights} nights</span></p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Your Room</h2>
              
              <div className="space-y-4">
                {hotelData.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedRoom === room.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{room.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                        
                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {room.amenities.map((amenity, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {amenity}
                            </span>
                          ))}
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          <span>Capacity: {room.capacity} guests</span>
                          <span className="mx-2">•</span>
                          <span>{room.available} rooms available</span>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-green-600">${room.price}</p>
                        <p className="text-sm text-gray-500">per night</p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                          ${room.price * hotelData.nights}
                        </p>
                        <p className="text-xs text-gray-500">total</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Guest Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary Guest */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Primary Guest</h3>
                  <div className="space-y-4">
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Guests */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Additional Guests</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                      </select>
                    </div>
                    
                    {guestCount > 1 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Guest 2 Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                    
                    {guestCount > 2 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Guest 3 Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                    
                    {guestCount > 3 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Guest 4 Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Special Requests</h2>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requests or preferences? (e.g., early check-in, room location, dietary requirements)"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Summary</h2>
              
              {selectedRoomData ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hotel</span>
                      <span className="font-medium">{hotelData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room Type</span>
                      <span className="font-medium">{selectedRoomData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in</span>
                      <span className="font-medium">{hotelData.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out</span>
                      <span className="font-medium">{hotelData.checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nights</span>
                      <span className="font-medium">{hotelData.nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests</span>
                      <span className="font-medium">{guestCount}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Price</span>
                      <span className="text-green-600">${totalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      ${selectedRoomData.price} × {hotelData.nights} nights
                    </p>
                  </div>
                  
                  <Link
                    href={`/checkout?hotel=${hotelId}&room=${selectedRoom}&guests=${guestCount}&total=${totalPrice}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center block"
                  >
                    Proceed to Checkout
                  </Link>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">🏨</div>
                  <p className="text-gray-600">Please select a room to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
