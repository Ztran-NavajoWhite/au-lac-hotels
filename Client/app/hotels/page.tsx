export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Hotels
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover our collection of luxury hotels, each offering unique experiences and world-class amenities
          </p>
        </div>
      </section>

      {/* Featured Hotels - Au Lac Legend & Charner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our flagship hotels offering the ultimate luxury experience with distinctive character and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {[
              {
                name: 'Au Lac Legend Hotel',
                location: 'Business District',
                description: 'Where luxury meets legend - Experience the epitome of hospitality excellence in the heart of the city.',
                features: ['5-Star Luxury', 'Business Center', 'Fine Dining', 'Spa & Wellness'],
                rating: 5,
                price: 'From $250/night',
                image: '/hotel-legend.jpg',
                amenities: ['WiFi', 'Gym', 'Restaurant', 'Bar', 'Concierge', 'Pool'],
                link: '/hotels/au-lac-legend',
                color: 'blue'
              },
              {
                name: 'Au Lac Charner Hotel',
                location: 'Cultural District',
                description: 'Where modern luxury meets authentic charm - Experience the perfect blend of contemporary comfort and traditional hospitality.',
                features: ['Boutique Luxury', 'Cultural Tours', 'Garden Restaurant', 'Art Gallery'],
                rating: 5,
                price: 'From $180/night',
                image: '/hotel-charner.jpg',
                amenities: ['WiFi', 'Garden', 'Restaurant', 'Library', 'Cultural Tours', 'Wellness'],
                link: '/hotels/au-lac-charner',
                color: 'green'
              }
            ].map((hotel, index) => (
              <div key={index} className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-gray-100 hover:shadow-3xl transition-shadow">
                <div className="bg-gray-200 h-64 flex items-center justify-center relative">
                  <span className="text-gray-500 text-lg">Hotel Image</span>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Featured
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {hotel.name}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        📍 {hotel.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        {[...Array(hotel.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">⭐</span>
                        ))}
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {hotel.price}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {hotel.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {hotel.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Amenities:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {hotel.amenities.map((amenity, amenityIndex) => (
                        <div key={amenityIndex} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={hotel.link}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center"
                    >
                      View Details
                    </a>
                    <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-semibold transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Hotels Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              More Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our additional luxury properties, each offering unique experiences and world-class amenities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                name: 'Au-Lac Downtown',
                location: 'City Center',
                description: 'A sophisticated urban retreat in the heart of the city, perfect for business and leisure travelers.',
                features: ['Business Center', 'Rooftop Pool', 'Fine Dining', 'Spa'],
                rating: 5,
                price: 'From $200/night',
                image: '/hotel-downtown.jpg',
                amenities: ['WiFi', 'Gym', 'Restaurant', 'Bar', 'Concierge']
              },
              {
                name: 'Au-Lac Beach Resort',
                location: 'Coastal Paradise',
                description: 'Escape to our beachfront resort offering stunning ocean views and endless relaxation.',
                features: ['Private Beach', 'Water Sports', 'Beach Bar', 'Spa'],
                rating: 5,
                price: 'From $350/night',
                image: '/hotel-beach.jpg',
                amenities: ['Beach Access', 'Pool', 'Restaurant', 'Spa', 'Activities']
              },
              {
                name: 'Au-Lac Mountain Lodge',
                location: 'Alpine Retreat',
                description: 'Nestled in the mountains, offering breathtaking views and outdoor adventure opportunities.',
                features: ['Mountain Views', 'Hiking Trails', 'Fireplace', 'Hot Tub'],
                rating: 5,
                price: 'From $280/night',
                image: '/hotel-mountain.jpg',
                amenities: ['Scenic Views', 'Hiking', 'Restaurant', 'Spa', 'Adventure']
              },
              {
                name: 'Au-Lac Heritage',
                location: 'Historic District',
                description: 'Experience luxury in a beautifully restored historic building with modern amenities.',
                features: ['Historic Architecture', 'Art Gallery', 'Wine Cellar', 'Garden'],
                rating: 5,
                price: 'From $320/night',
                image: '/hotel-heritage.jpg',
                amenities: ['Historic Tours', 'Art Gallery', 'Restaurant', 'Garden', 'Library']
              }
            ].map((hotel, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Hotel Image</span>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {hotel.name}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        📍 {hotel.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        {[...Array(hotel.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">⭐</span>
                        ))}
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {hotel.price}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {hotel.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {hotel.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Amenities:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {hotel.amenities.map((amenity, amenityIndex) => (
                        <div key={amenityIndex} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-semibold transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Find Your Perfect Hotel
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Locations</option>
                  <option>City Center</option>
                  <option>Coastal Paradise</option>
                  <option>Alpine Retreat</option>
                  <option>Historic District</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in
                </label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
            </div>
            
            <div className="text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Search Hotels
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Special Offers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take advantage of our exclusive deals and packages for an even more memorable stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Weekend Getaway',
                description: 'Book a weekend stay and enjoy 20% off plus complimentary breakfast.',
                discount: '20% OFF',
                validUntil: 'Valid until Dec 31, 2024'
              },
              {
                title: 'Extended Stay',
                description: 'Stay 7+ nights and receive 15% off plus free airport transfer.',
                discount: '15% OFF',
                validUntil: 'Valid until Dec 31, 2024'
              },
              {
                title: 'Honeymoon Package',
                description: 'Special romantic package with champagne, flowers, and spa treatment.',
                discount: '25% OFF',
                validUntil: 'Valid until Dec 31, 2024'
              }
            ].map((offer, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <div className="text-center">
                  <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    {offer.discount}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {offer.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {offer.validUntil}
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Book Offer
                  </button>
                </div>
              </div>
            ))}
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
            Choose from our collection of world-class hotels and create unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              View All Hotels
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
