export default function AuLacLegendPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Au Lac Legend Hotel
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Where luxury meets legend - Experience the epitome of hospitality excellence in the heart of the city
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Book Your Stay
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Hotel Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                A Legendary Experience
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Au Lac Legend Hotel stands as a testament to timeless elegance and exceptional service. Located in the prestigious business district, this iconic property has been welcoming distinguished guests for over two decades.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">5-star luxury accommodation</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">Prime city center location</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">Award-winning restaurants</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">World-class spa & wellness</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Hotel Exterior Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Luxurious Accommodations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated selection of rooms and suites, each designed for ultimate comfort and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Deluxe Room',
                description: 'Spacious rooms with city views, featuring premium amenities and elegant furnishings.',
                size: '45 sqm',
                occupancy: '2 Adults + 1 Child',
                price: 'From $250/night',
                features: ['City View', 'King Bed', 'Marble Bathroom', 'Work Desk', 'Mini Bar']
              },
              {
                name: 'Executive Suite',
                description: 'Luxurious suites with separate living area, perfect for business or extended stays.',
                size: '75 sqm',
                occupancy: '2 Adults + 2 Children',
                price: 'From $450/night',
                features: ['Living Room', 'King Bed', 'Executive Lounge Access', 'Butler Service', 'Premium Amenities']
              },
              {
                name: 'Presidential Suite',
                description: 'Our most prestigious accommodation, offering unparalleled luxury and personalized service.',
                size: '150 sqm',
                occupancy: '4 Adults',
                price: 'From $1,200/night',
                features: ['Panoramic Views', 'Private Terrace', 'Dining Room', '24/7 Butler', 'Luxury Car Service']
              }
            ].map((room, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Room Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{room.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-500">
                    <div>Size: {room.size}</div>
                    <div>Occupancy: {room.occupancy}</div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-green-600">{room.price}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {room.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Book This Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities & Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              World-Class Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the exceptional facilities and services that make Au Lac Legend Hotel truly legendary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Fine Dining',
                description: 'Multiple award-winning restaurants serving international and local cuisine.',
                icon: '🍽️'
              },
              {
                title: 'Spa & Wellness',
                description: 'Luxurious spa treatments and state-of-the-art fitness center.',
                icon: '💆‍♀️'
              },
              {
                title: 'Business Center',
                description: 'Fully equipped meeting rooms and business facilities.',
                icon: '💼'
              },
              {
                title: 'Swimming Pool',
                description: 'Indoor and outdoor pools with stunning city views.',
                icon: '🏊‍♂️'
              },
              {
                title: 'Concierge Service',
                description: '24/7 personalized assistance for all your needs.',
                icon: '🎩'
              },
              {
                title: 'Valet Parking',
                description: 'Complimentary valet parking service for guests.',
                icon: '🚗'
              },
              {
                title: 'Room Service',
                description: '24-hour in-room dining with extensive menu.',
                icon: '🛎️'
              },
              {
                title: 'WiFi & Technology',
                description: 'High-speed internet and smart room technology.',
                icon: '📱'
              }
            ].map((amenity, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{amenity.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{amenity.title}</h3>
                <p className="text-gray-600 text-sm">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Prime Location
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Situated in the heart of the city's business and entertainment district, Au Lac Legend Hotel offers easy access to major attractions, shopping centers, and transportation hubs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-blue-600 text-xl mr-3 mt-1">📍</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">123 Legend Avenue, Business District<br />City Center, 10000</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-blue-600 text-xl mr-3 mt-1">📞</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-blue-600 text-xl mr-3 mt-1">✉️</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@aulaclegend.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Location Map</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience the Legend
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your stay at Au Lac Legend Hotel and discover why we're considered the epitome of luxury hospitality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Book Now
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
