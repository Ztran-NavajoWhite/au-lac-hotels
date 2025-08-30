'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SearchPage() {
  const [sortBy, setSortBy] = useState('price')
  const [priceRange, setPriceRange] = useState('all')
  const [hotelType, setHotelType] = useState('all')

  // Mock search results - in real app this would come from API
  const searchResults = [
    {
      id: 1,
      name: 'Au Lac Legend Hotel',
      location: 'Business District',
      description: '5-star luxury hotel in the heart of the business district',
      price: 250,
      rating: 5,
      image: '/hotel-legend.jpg',
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
      roomTypes: ['Deluxe Room', 'Executive Suite', 'Presidential Suite'],
      available: true
    },
    {
      id: 2,
      name: 'Au Lac Charner Hotel',
      location: 'Cultural District',
      description: 'Boutique luxury hotel in the vibrant cultural district',
      price: 180,
      rating: 5,
      image: '/hotel-charner.jpg',
      amenities: ['WiFi', 'Garden', 'Restaurant', 'Art Gallery', 'Cultural Tours'],
      roomTypes: ['Charm Room', 'Deluxe Charm Suite', 'Charner Signature Suite'],
      available: true
    },
    {
      id: 3,
      name: 'Au-Lac Downtown',
      location: 'City Center',
      description: 'Sophisticated urban retreat perfect for business and leisure',
      price: 200,
      rating: 5,
      image: '/hotel-downtown.jpg',
      amenities: ['WiFi', 'Business Center', 'Rooftop Pool', 'Fine Dining', 'Spa'],
      roomTypes: ['Standard Room', 'Deluxe Room', 'Business Suite'],
      available: true
    },
    {
      id: 4,
      name: 'Au-Lac Beach Resort',
      location: 'Coastal Paradise',
      description: 'Beachfront resort with stunning ocean views',
      price: 350,
      rating: 5,
      image: '/hotel-beach.jpg',
      amenities: ['Beach Access', 'Water Sports', 'Beach Bar', 'Spa', 'Pool'],
      roomTypes: ['Ocean View Room', 'Beach Suite', 'Villa'],
      available: true
    }
  ]

  const filteredResults = searchResults.filter(hotel => {
    if (priceRange === 'all') return true
    if (priceRange === '0-200') return hotel.price <= 200
    if (priceRange === '200-400') return hotel.price > 200 && hotel.price <= 400
    if (priceRange === '400-600') return hotel.price > 400 && hotel.price <= 600
    if (priceRange === '600+') return hotel.price > 600
    return true
  })

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
              <p className="text-gray-600 mt-2">Found {sortedResults.length} hotels matching your criteria</p>
            </div>
            
            {/* Search Summary */}
            <div className="mt-4 md:mt-0 text-sm text-gray-600">
              <p>Check-in: <span className="font-medium">Dec 25, 2024</span></p>
              <p>Check-out: <span className="font-medium">Dec 28, 2024</span></p>
              <p>Guests: <span className="font-medium">2</span> • Rooms: <span className="font-medium">1</span></p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="price">Price (Low to High)</option>
                  <option value="rating">Rating (High to Low)</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="0-200">$0 - $200</option>
                  <option value="200-400">$200 - $400</option>
                  <option value="400-600">$400 - $600</option>
                  <option value="600+">$600+</option>
                </select>
              </div>

              {/* Hotel Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Type</label>
                <select
                  value={hotelType}
                  onChange={(e) => setHotelType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="luxury">Luxury</option>
                  <option value="boutique">Boutique</option>
                  <option value="resort">Resort</option>
                  <option value="business">Business</option>
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSortBy('price')
                  setPriceRange('all')
                  setHotelType('all')
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {sortedResults.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="md:flex">
                    {/* Hotel Image */}
                    <div className="md:w-1/3">
                      <div className="bg-gray-200 h-48 md:h-full flex items-center justify-center">
                        <span className="text-gray-500 text-lg">Hotel Image</span>
                      </div>
                    </div>

                    {/* Hotel Details */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                          <p className="text-blue-600 font-medium mb-2">📍 {hotel.location}</p>
                          <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-2">
                            {[...Array(hotel.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-lg">⭐</span>
                            ))}
                          </div>
                          <p className="text-3xl font-bold text-green-600">${hotel.price}</p>
                          <p className="text-sm text-gray-500">per night</p>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Amenities:</h4>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.map((amenity, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Room Types */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Available Room Types:</h4>
                        <div className="flex flex-wrap gap-2">
                          {hotel.roomTypes.map((roomType, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {roomType}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link
                          href={`/booking?hotel=${hotel.id}&name=${encodeURIComponent(hotel.name)}`}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center"
                        >
                          Book Now
                        </Link>
                        <Link
                          href={`/hotels/${hotel.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                          className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-semibold transition-colors text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {sortedResults.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                <Link
                  href="/"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Modify Search
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
