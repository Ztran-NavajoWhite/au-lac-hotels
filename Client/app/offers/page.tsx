export default function OffersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Special Offers
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover exclusive deals, packages, and promotions designed to make your luxury stay even more affordable
          </p>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Deals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Limited-time offers and exclusive packages that provide exceptional value for your luxury experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: 'Holiday Season Special',
                subtitle: 'December 20 - January 5',
                description: 'Celebrate the holidays with our special package including luxury accommodation, festive dining, and exclusive activities.',
                originalPrice: '$500',
                discountedPrice: '$350',
                savings: '30% OFF',
                features: [
                  'Luxury Room or Suite',
                  'Daily Breakfast',
                  'Holiday Dinner Experience',
                  'Festive Activities',
                  'Late Check-out',
                  'Welcome Gift'
                ],
                image: '/holiday-offer.jpg',
                limited: true,
                remainingDays: 15
              },
              {
                title: 'Romantic Getaway Package',
                subtitle: 'Valid Year-Round',
                description: 'Perfect for couples seeking a romantic escape with premium amenities and intimate experiences.',
                originalPrice: '$400',
                discountedPrice: '$280',
                savings: '30% OFF',
                features: [
                  'Premium Suite',
                  'Champagne on Arrival',
                  'Couples Spa Treatment',
                  'Romantic Dinner',
                  'Rose Petal Turndown',
                  'Couples Activity'
                ],
                image: '/romantic-offer.jpg',
                limited: false,
                remainingDays: null
              }
            ].map((offer, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gray-200 h-64 flex items-center justify-center relative">
                  <span className="text-gray-500 text-lg">Offer Image</span>
                  {offer.limited && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Limited Time!
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {offer.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl font-bold text-green-600">
                      {offer.discountedPrice}
                    </div>
                    <div className="text-xl text-gray-400 line-through">
                      {offer.originalPrice}
                    </div>
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {offer.savings}
                    </div>
                  </div>

                  {offer.limited && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <p className="text-yellow-800 text-sm">
                        ⏰ Only {offer.remainingDays} days remaining to book this offer!
                      </p>
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Package Includes:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {offer.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                      Book Now
                    </button>
                    <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seasonal Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Special offers designed around the seasons and local events throughout the year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Spring Wellness Retreat',
                season: 'Spring',
                description: 'Rejuvenate with our wellness package including spa treatments, yoga classes, and healthy dining options.',
                price: 'From $299',
                duration: '3 nights',
                highlights: ['Spa Credit', 'Yoga Classes', 'Healthy Meals', 'Nature Walks'],
                validUntil: 'May 31, 2024'
              },
              {
                title: 'Summer Beach Escape',
                season: 'Summer',
                description: 'Enjoy the perfect beach vacation with water activities, beachside dining, and family entertainment.',
                price: 'From $399',
                duration: '4 nights',
                highlights: ['Beach Activities', 'Water Sports', 'Family Entertainment', 'Beachside BBQ'],
                validUntil: 'August 31, 2024'
              },
              {
                title: 'Autumn Cultural Experience',
                season: 'Autumn',
                description: 'Immerse yourself in local culture with guided tours, traditional dining, and cultural performances.',
                price: 'From $349',
                duration: '3 nights',
                highlights: ['Cultural Tours', 'Traditional Dining', 'Local Performances', 'Art Workshops'],
                validUntil: 'November 30, 2024'
              }
            ].map((package_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    {package_.season}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {package_.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {package_.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-blue-600">{package_.price}</span>
                    <span className="text-gray-600 ml-2">for {package_.duration}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Highlights:</h4>
                  <div className="space-y-2">
                    {package_.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500 mb-3">
                    Valid until {package_.validUntil}
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Book Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Program Offers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loyalty Member Exclusives
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Special offers and benefits exclusively available to our valued loyalty program members.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: 'Gold Member Benefits',
                tier: 'Gold',
                description: 'Exclusive offers and enhanced services for our Gold tier members.',
                benefits: [
                  '15% off all bookings',
                  'Free room upgrade (subject to availability)',
                  'Early check-in and late check-out',
                  'Complimentary breakfast',
                  'Priority reservations',
                  'Exclusive member events'
                ],
                requirements: 'Stay 10+ nights per year',
                color: 'from-yellow-400 to-yellow-600'
              },
              {
                title: 'Platinum Member Benefits',
                tier: 'Platinum',
                description: 'Premium benefits and exclusive access for our highest tier members.',
                benefits: [
                  '25% off all bookings',
                  'Guaranteed room upgrade',
                  '24/7 dedicated concierge',
                  'All-inclusive dining package',
                  'Spa and wellness credits',
                  'Private airport transfers'
                ],
                requirements: 'Stay 25+ nights per year',
                color: 'from-gray-400 to-gray-600'
              }
            ].map((tier, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <div className={`inline-block bg-gradient-to-r ${tier.color} text-white px-4 py-2 rounded-full text-sm font-bold mb-3`}>
                    {tier.tier} Member
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {tier.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {tier.description}
                  </p>
                  <p className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                    Requirements: {tier.requirements}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Benefits Include:</h4>
                  <div className="space-y-2">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Join Program
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sales */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Flash Sales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Limited-time offers with massive discounts - book quickly before they're gone!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Last-Minute Weekend Deal',
                discount: '50% OFF',
                originalPrice: '$400',
                salePrice: '$200',
                description: 'Book within 48 hours for this weekend and save big on luxury accommodation.',
                timeLeft: '23:45:12',
                features: ['Luxury Room', 'Breakfast Included', 'Free WiFi', 'Fitness Center Access'],
                image: '/flash-sale-1.jpg'
              },
              {
                title: 'Midweek Special',
                discount: '40% OFF',
                originalPrice: '$350',
                salePrice: '$210',
                description: 'Perfect for business travelers and those seeking a midweek escape.',
                timeLeft: '47:32:18',
                features: ['Business Room', 'Work Desk', 'High-Speed Internet', 'Business Center Access'],
                image: '/flash-sale-2.jpg'
              }
            ].map((sale, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-red-200">
                <div className="bg-red-100 p-6 text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {sale.discount}
                  </div>
                  <div className="text-lg text-red-800 font-semibold">
                    Time Remaining: {sale.timeLeft}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {sale.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {sale.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-2xl font-bold text-green-600">
                      {sale.salePrice}
                    </div>
                    <div className="text-lg text-gray-400 line-through">
                      {sale.originalPrice}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {sale.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-700 text-sm">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                    Book Flash Sale
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter for Offers */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Never Miss a Deal
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our offers newsletter and be the first to know about exclusive deals, flash sales, and special packages.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm text-blue-200 mt-4">
            Get exclusive access to member-only offers and early booking privileges.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Save?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your stay with our special offers and experience luxury at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View All Offers
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
