export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explore our hotels through stunning photography showcasing luxury accommodations, world-class amenities, and unforgettable experiences
          </p>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through different categories to discover the beauty and luxury of Au-Lac Hotels.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { name: 'All Photos', count: 156, active: true },
              { name: 'Rooms & Suites', count: 42, active: false },
              { name: 'Dining', count: 28, active: false },
              { name: 'Amenities', count: 35, active: false },
              { name: 'Events', count: 23, active: false },
              { name: 'Exterior', count: 18, active: false },
              { name: 'Spa & Wellness', count: 15, active: false },
              { name: 'Activities', count: 25, active: false }
            ].map((category, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  category.active
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="font-semibold mb-1">{category.name}</div>
                <div className="text-sm text-gray-500">{category.count} photos</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Photos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our most stunning and popular images that capture the essence of luxury hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Luxury Suite',
                description: 'Spacious suite with panoramic city views',
                category: 'Rooms & Suites',
                image: '/gallery-suite-1.jpg',
                featured: true
              },
              {
                title: 'Fine Dining Restaurant',
                description: 'Elegant dining space with world-class cuisine',
                category: 'Dining',
                image: '/gallery-restaurant-1.jpg',
                featured: true
              },
              {
                title: 'Infinity Pool',
                description: 'Stunning rooftop pool with city skyline',
                category: 'Amenities',
                image: '/gallery-pool-1.jpg',
                featured: true
              },
              {
                title: 'Spa Treatment Room',
                description: 'Serene spa environment for ultimate relaxation',
                category: 'Spa & Wellness',
                image: '/gallery-spa-1.jpg',
                featured: true
              },
              {
                title: 'Wedding Ceremony',
                description: 'Beautiful outdoor wedding setup',
                category: 'Events',
                image: '/gallery-wedding-1.jpg',
                featured: true
              },
              {
                title: 'Hotel Exterior',
                description: 'Majestic hotel facade at sunset',
                category: 'Exterior',
                image: '/gallery-exterior-1.jpg',
                featured: true
              }
            ].map((photo, index) => (
              <div key={index} className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gray-200 h-64 flex items-center justify-center relative overflow-hidden">
                  <span className="text-gray-500 text-lg">Featured Image</span>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Full Size
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {photo.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {photo.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms & Suites Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Rooms & Suites
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our luxurious accommodations designed for comfort, style, and unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Deluxe Room', type: 'Standard', price: 'From $200' },
              { name: 'Executive Suite', type: 'Suite', price: 'From $400' },
              { name: 'Presidential Suite', type: 'Luxury', price: 'From $800' },
              { name: 'Family Room', type: 'Family', price: 'From $300' },
              { name: 'Business Room', type: 'Business', price: 'From $250' },
              { name: 'Honeymoon Suite', type: 'Romantic', price: 'From $500' },
              { name: 'Accessible Room', type: 'Accessible', price: 'From $200' },
              { name: 'Penthouse', type: 'Ultra Luxury', price: 'From $1200' }
            ].map((room, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Room Image</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{room.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{room.type}</p>
                  <p className="text-green-600 font-semibold">{room.price}</p>
                  <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    View Photos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Gallery */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Culinary Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our world-class dining venues and exquisite cuisine through stunning photography.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: 'Main Restaurant',
                description: 'Our flagship restaurant offering international cuisine with local influences.',
                features: ['Breakfast Buffet', 'Lunch Service', 'Dinner Experience', 'Wine Pairing'],
                image: '/gallery-main-restaurant.jpg'
              },
              {
                title: 'Rooftop Bar',
                description: 'Sophisticated rooftop venue with panoramic views and craft cocktails.',
                features: ['Craft Cocktails', 'Light Bites', 'Sunset Views', 'Live Music'],
                image: '/gallery-rooftop-bar.jpg'
              }
            ].map((venue, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Restaurant Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {venue.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {venue.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {venue.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    View Gallery
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Virtual Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a virtual tour of our properties and experience the luxury before you arrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '360° Room Tours',
                description: 'Explore our rooms and suites in immersive 360-degree virtual tours.',
                icon: '🏠',
                buttonText: 'Start Virtual Tour'
              },
              {
                title: 'Property Walkthrough',
                description: 'Navigate through our hotels and discover all amenities and facilities.',
                icon: '🚶',
                buttonText: 'Begin Walkthrough'
              },
              {
                title: 'Drone Footage',
                description: 'Aerial views showcasing the beauty and scale of our properties.',
                icon: '🚁',
                buttonText: 'Watch Drone Video'
              }
            ].map((tour, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200 text-center">
                <div className="text-5xl mb-4">{tour.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {tour.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {tour.description}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  {tour.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Contest */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Share Your Experience
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Have you stayed with us? Share your photos and experiences for a chance to be featured in our gallery and win exclusive rewards.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Submit Photos
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              View Contest Rules
            </button>
          </div>
          
          <p className="text-sm text-blue-200 mt-6">
            Monthly winners receive complimentary stays and exclusive experiences.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience the Beauty
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your stay and experience the luxury and beauty captured in our gallery firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Book Your Stay
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
