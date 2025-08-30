export default function AuLacCharnerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-800 via-green-700 to-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Au Lac Charner Hotel
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Where modern luxury meets authentic charm - Experience the perfect blend of contemporary comfort and traditional hospitality
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Book Your Stay
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-3 rounded-lg font-semibold transition-colors">
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
                A Charming Experience
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Au Lac Charner Hotel combines contemporary luxury with warm, personalized service. Located in the vibrant cultural district, this boutique property offers an intimate and memorable stay experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">Boutique luxury accommodation</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">Cultural district location</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">Artisanal dining experiences</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">Personalized guest services</span>
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
              Elegant Accommodations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each room and suite is thoughtfully designed to provide comfort, style, and a sense of home away from home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Charm Room',
                description: 'Cozy rooms with garden views, featuring elegant furnishings and modern amenities.',
                size: '35 sqm',
                occupancy: '2 Adults',
                price: 'From $180/night',
                features: ['Garden View', 'Queen Bed', 'Private Bathroom', 'Work Space', 'Coffee Maker']
              },
              {
                name: 'Deluxe Charm Suite',
                description: 'Spacious suites with separate seating area, perfect for families or extended stays.',
                size: '55 sqm',
                occupancy: '2 Adults + 1 Child',
                price: 'From $280/night',
                features: ['Living Area', 'King Bed', 'Garden Terrace', 'Premium Toiletries', 'Mini Kitchen']
              },
              {
                name: 'Charner Signature Suite',
                description: 'Our most exclusive suite offering luxury amenities and personalized service.',
                size: '85 sqm',
                occupancy: '3 Adults',
                price: 'From $450/night',
                features: ['Private Garden', 'King Bed + Twin', 'Dining Area', 'Concierge Service', 'Luxury Amenities']
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
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
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
              Charming Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the unique facilities and services that make Au Lac Charner Hotel a truly special place to stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Garden Restaurant',
                description: 'Seasonal menu featuring local ingredients and traditional recipes.',
                icon: '🌱'
              },
              {
                title: 'Wellness Garden',
                description: 'Tranquil outdoor space for yoga, meditation, and relaxation.',
                icon: '🧘‍♀️'
              },
              {
                title: 'Art Gallery',
                description: 'Rotating exhibitions showcasing local artists and cultural heritage.',
                icon: '🎨'
              },
              {
                title: 'Library Lounge',
                description: 'Cozy reading area with curated books and comfortable seating.',
                icon: '📚'
              },
              {
                title: 'Cultural Tours',
                description: 'Guided tours to explore the rich cultural heritage of the area.',
                icon: '🏛️'
              },
              {
                title: 'Bicycle Rental',
                description: 'Explore the neighborhood on our complimentary bicycles.',
                icon: '🚲'
              },
              {
                title: 'Evening Tea',
                description: 'Traditional afternoon tea service in our garden courtyard.',
                icon: '☕'
              },
              {
                title: 'Local Experiences',
                description: 'Curated experiences to connect with local culture and community.',
                icon: '🌟'
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
                Cultural Heart
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Located in the vibrant cultural district, Au Lac Charner Hotel is surrounded by museums, galleries, theaters, and historic landmarks, offering guests easy access to the city's rich cultural heritage.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-3 mt-1">📍</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">456 Charner Street, Cultural District<br />Arts Quarter, 10000</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-3 mt-1">📞</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-3 mt-1">✉️</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@aulaccharner.com</p>
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
      <section className="py-16 bg-gradient-to-br from-green-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience the Charm
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Book your stay at Au Lac Charner Hotel and discover the perfect blend of luxury, culture, and authentic hospitality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Book Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
