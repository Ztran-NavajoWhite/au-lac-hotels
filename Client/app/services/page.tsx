export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover the comprehensive range of services designed to make your stay exceptional and memorable
          </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Premium Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From luxury accommodations to personalized experiences, we offer everything you need for a perfect stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Luxury Accommodations',
                description: 'Spacious rooms and suites with premium amenities, stunning views, and the highest standards of comfort.',
                icon: '🏨',
                features: ['Premium Bedding', 'City Views', 'Balcony Access', 'Mini Bar'],
                price: 'Included'
              },
              {
                title: 'Fine Dining',
                description: 'World-class restaurants offering international cuisine, local specialties, and exceptional service.',
                icon: '🍽️',
                features: ['International Cuisine', 'Local Specialties', 'Wine Pairing', 'Private Dining'],
                price: 'À la carte'
              },
              {
                title: 'Spa & Wellness',
                description: 'Rejuvenate your body and mind with our comprehensive spa treatments and wellness programs.',
                icon: '🧘',
                features: ['Massage Therapy', 'Facial Treatments', 'Wellness Programs', 'Fitness Center'],
                price: 'From $80'
              },
              {
                title: 'Concierge Services',
                description: 'Personalized assistance for reservations, transportation, tours, and special requests.',
                icon: '🎫',
                features: ['Tour Booking', 'Transportation', 'Restaurant Reservations', 'Event Tickets'],
                price: 'Included'
              },
              {
                title: 'Business Facilities',
                description: 'State-of-the-art business center and meeting rooms for corporate events and conferences.',
                icon: '💼',
                features: ['Meeting Rooms', 'Business Center', 'Audio/Visual Equipment', 'Catering'],
                price: 'From $200'
              },
              {
                title: 'Recreation & Activities',
                description: 'Enjoy swimming pools, fitness centers, sports facilities, and organized activities.',
                icon: '🏊',
                features: ['Swimming Pools', 'Fitness Center', 'Sports Courts', 'Kids Club'],
                price: 'Included'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {service.price}
                  </div>
                </div>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Specialized Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unique experiences and personalized services that set us apart from the ordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: 'Wedding & Events',
                description: 'Create unforgettable moments with our comprehensive wedding and event planning services.',
                image: '/wedding-service.jpg',
                services: [
                  'Wedding Planning & Coordination',
                  'Reception Venues',
                  'Catering & Bar Service',
                  'Photography & Videography',
                  'Floral Arrangements',
                  'Entertainment & Music'
                ],
                startingPrice: '$5,000'
              },
              {
                title: 'Corporate Events',
                description: 'Professional meeting spaces and event planning for successful corporate gatherings.',
                image: '/corporate-service.jpg',
                services: [
                  'Conference Rooms',
                  'Audio/Visual Equipment',
                  'Catering Services',
                  'Event Coordination',
                  'Team Building Activities',
                  'Networking Events'
                ],
                startingPrice: '$1,500'
              }
            ].map((specialized, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Service Image</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {specialized.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {specialized.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Services Include:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {specialized.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-green-600">
                      Starting at {specialized.startingPrice}
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Service Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our curated packages designed to enhance your stay and provide exceptional value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Essential Package',
                price: '$99',
                duration: 'per night',
                description: 'Perfect for business travelers and short stays.',
                features: [
                  'Complimentary WiFi',
                  'Daily Housekeeping',
                  'Fitness Center Access',
                  'Business Center Access',
                  'Concierge Services'
                ],
                popular: false
              },
              {
                name: 'Premium Package',
                price: '$199',
                duration: 'per night',
                description: 'Enhanced experience with additional amenities.',
                features: [
                  'All Essential Features',
                  'Breakfast Included',
                  'Spa Access',
                  'Pool Access',
                  'Room Service',
                  'Late Check-out'
                ],
                popular: true
              },
              {
                name: 'Luxury Package',
                price: '$399',
                duration: 'per night',
                description: 'Ultimate luxury experience with premium services.',
                features: [
                  'All Premium Features',
                  'Private Butler Service',
                  'Exclusive Lounge Access',
                  'Spa Treatment',
                  'Airport Transfer',
                  'Personal Concierge'
                ],
                popular: false
              }
            ].map((package_, index) => (
              <div key={index} className={`relative bg-white rounded-xl shadow-lg p-8 border-2 ${
                package_.popular ? 'border-blue-500' : 'border-gray-200'
              }`}>
                {package_.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {package_.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-blue-600">{package_.price}</span>
                    <span className="text-gray-600 ml-2">{package_.duration}</span>
                  </div>
                  <p className="text-gray-600">
                    {package_.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {package_.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    package_.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}>
                    {package_.popular ? 'Choose Package' : 'Select Package'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Request Form */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Request Custom Services
              </h3>
              <p className="text-gray-600">
                Have a specific request? Let us know and we'll create a personalized service package for you.
              </p>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select a service</option>
                  <option>Wedding & Events</option>
                  <option>Corporate Events</option>
                  <option>Spa & Wellness</option>
                  <option>Dining Services</option>
                  <option>Custom Package</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe your requirements..."></textarea>
              </div>
              
              <div className="text-center">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience Exceptional Service
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let us exceed your expectations with our comprehensive range of premium services and personalized attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Book Services
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
