export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search Form */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to Au-Lac Hotels
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Discover luxury accommodations and unforgettable experiences at our world-class hotels
          </p>
          
          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Perfect Stay</h2>
            
            <form action="/search" method="GET" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Destination */}
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <select
                    id="destination"
                    name="destination"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Destination</option>
                    <option value="all">All Destinations</option>
                    <option value="business-district">Business District</option>
                    <option value="cultural-district">Cultural District</option>
                    <option value="downtown">Downtown</option>
                    <option value="beach">Beach Resort</option>
                    <option value="mountain">Mountain Lodge</option>
                  </select>
                </div>

                {/* Check-in Date */}
                <div>
                  <label htmlFor="checkin" className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    id="checkin"
                    name="checkin"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Check-out Date */}
                <div>
                  <label htmlFor="checkout" className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    id="checkout"
                    name="checkout"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Guests */}
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Additional Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Rooms */}
                <div>
                  <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-2">
                    Rooms
                  </label>
                  <select
                    id="rooms"
                    name="rooms"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">1 Room</option>
                    <option value="2">2 Rooms</option>
                    <option value="3">3 Rooms</option>
                    <option value="4">4+ Rooms</option>
                  </select>
                </div>

                {/* Room Type */}
                <div>
                  <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type
                  </label>
                  <select
                    id="roomType"
                    name="roomType"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Any Type</option>
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="presidential">Presidential</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    id="priceRange"
                    name="priceRange"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Any Price</option>
                    <option value="0-200">$0 - $200</option>
                    <option value="200-400">$200 - $400</option>
                    <option value="400-600">$400 - $600</option>
                    <option value="600+">$600+</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  🔍 Search Available Hotels
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Au-Lac Hotels?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience luxury, comfort, and exceptional service at every stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">5-Star Luxury</h3>
              <p className="text-gray-600">
                World-class accommodations with premium amenities and exceptional service
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prime Locations</h3>
              <p className="text-gray-600">
                Strategically located in the most desirable areas of the city
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusive Experiences</h3>
              <p className="text-gray-600">
                Unique services and amenities that create unforgettable memories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your journey with Au-Lac Hotels and discover the perfect blend of comfort, style, and exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Explore Our Hotels
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
