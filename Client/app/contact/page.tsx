export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get in touch with our team for reservations, inquiries, or any assistance you may need
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach us - we're here to help make your stay exceptional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Reservations',
                description: 'Book your stay or modify existing reservations',
                phone: '+1 (555) 123-4567',
                email: 'reservations@au-lac-hotels.com',
                icon: '📞',
                hours: '24/7'
              },
              {
                title: 'General Inquiries',
                description: 'Questions about our hotels and services',
                phone: '+1 (555) 123-4568',
                email: 'info@au-lac-hotels.com',
                icon: '💬',
                hours: 'Mon-Fri 9AM-6PM'
              },
              {
                title: 'Concierge',
                description: 'Personal assistance and special requests',
                phone: '+1 (555) 123-4569',
                email: 'concierge@au-lac-hotels.com',
                icon: '🎫',
                hours: '24/7'
              },
              {
                title: 'Group Sales',
                description: 'Corporate events and group bookings',
                phone: '+1 (555) 123-4570',
                email: 'groups@au-lac-hotels.com',
                icon: '👥',
                hours: 'Mon-Fri 8AM-7PM'
              }
            ].map((contact, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {contact.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {contact.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-blue-600 font-medium">
                    {contact.phone}
                  </div>
                  <div className="text-blue-600 font-medium">
                    {contact.email}
                  </div>
                  <div className="text-sm text-gray-500">
                    {contact.hours}
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Contact Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Locations */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find us at these prime locations and get directions to your preferred property.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                name: 'Au-Lac Downtown',
                address: '123 Business District, Downtown, City, State 12345',
                phone: '+1 (555) 123-4567',
                email: 'downtown@au-lac-hotels.com',
                features: ['City Center Location', 'Business Facilities', 'Rooftop Pool', 'Fine Dining'],
                image: '/hotel-downtown.jpg'
              },
              {
                name: 'Au-Lac Beach Resort',
                address: '456 Coastal Highway, Beach City, State 12345',
                phone: '+1 (555) 123-4568',
                email: 'beach@au-lac-hotels.com',
                features: ['Beachfront Location', 'Water Sports', 'Spa & Wellness', 'Beach Bar'],
                image: '/hotel-beach.jpg'
              }
            ].map((hotel, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Hotel Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {hotel.name}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <span className="text-gray-500 mr-3 mt-1">📍</span>
                      <p className="text-gray-700">{hotel.address}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3">📞</span>
                      <p className="text-gray-700">{hotel.phone}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3">✉️</span>
                      <p className="text-gray-700">{hotel.email}</p>
                    </div>
                  </div>

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

                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      Get Directions
                    </button>
                    <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a question or special request? Fill out the form below and we'll get back to you promptly.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="reservation">Reservation Inquiry</option>
                  <option value="general">General Information</option>
                  <option value="concierge">Concierge Service</option>
                  <option value="group">Group Booking</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Hotel
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a hotel</option>
                  <option value="downtown">Au-Lac Downtown</option>
                  <option value="beach">Au-Lac Beach Resort</option>
                  <option value="mountain">Au-Lac Mountain Lodge</option>
                  <option value="heritage">Au-Lac Heritage</option>
                  <option value="any">Any Location</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  rows={6}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please describe your inquiry or request..."
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                  Subscribe to our newsletter for updates and special offers
                </label>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our hotels and services.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'What are your check-in and check-out times?',
                answer: 'Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability.'
              },
              {
                question: 'Do you offer airport transportation?',
                answer: 'Yes, we provide airport transportation services. Please contact our concierge at least 24 hours in advance to arrange pickup or drop-off.'
              },
              {
                question: 'Are pets allowed at your hotels?',
                answer: 'We welcome well-behaved pets at most of our properties. Please contact us in advance to confirm pet policies and any additional fees.'
              },
              {
                question: 'What dining options are available?',
                answer: 'Each hotel features multiple dining venues including fine dining restaurants, casual cafes, room service, and bars. We also accommodate special dietary requirements.'
              },
              {
                question: 'Do you have meeting and event spaces?',
                answer: 'Yes, we offer flexible meeting rooms, conference facilities, and event spaces suitable for corporate events, weddings, and social gatherings.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-red-200">
            <div className="text-5xl mb-4">🚨</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Emergency Contact
            </h2>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              For urgent matters or emergencies, please use these dedicated contact numbers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">Emergency</div>
                <div className="text-lg font-medium">+1 (555) 911-0000</div>
                <div className="text-sm text-gray-500">24/7 Emergency Line</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">Security</div>
                <div className="text-lg font-medium">+1 (555) 911-0001</div>
                <div className="text-sm text-gray-500">24/7 Security Line</div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              These numbers are monitored 24/7 for immediate assistance with emergencies, security concerns, or urgent guest needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to begin planning your perfect stay at Au-Lac Hotels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Book Your Stay
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
