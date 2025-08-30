export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Latest News
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Stay updated with the latest news, events, and insights from Au-Lac Hotels and the hospitality industry
          </p>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most important updates and stories from our hotels and the world of luxury hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {[
              {
                title: 'Au-Lac Hotels Named Best Luxury Hotel Chain 2024',
                excerpt: 'We are proud to announce that Au-Lac Hotels has been recognized as the Best Luxury Hotel Chain for 2024 by the prestigious Hospitality Excellence Awards.',
                category: 'Awards & Recognition',
                date: 'December 15, 2024',
                readTime: '5 min read',
                image: '/news-award.jpg',
                featured: true
              },
              {
                title: 'New Sustainable Initiatives Launch Across All Properties',
                excerpt: 'Our commitment to environmental responsibility takes a major step forward with the launch of comprehensive sustainability programs across all Au-Lac properties.',
                category: 'Sustainability',
                date: 'December 10, 2024',
                readTime: '4 min read',
                image: '/news-sustainability.jpg',
                featured: true
              }
            ].map((article, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Featured Image</span>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {article.date}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Read Full Story
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Updates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed with our latest news, announcements, and industry insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'New Executive Chef Joins Au-Lac Downtown',
                excerpt: 'Chef Maria Rodriguez brings her innovative culinary vision to our flagship restaurant, promising an exciting new dining experience.',
                category: 'Culinary',
                date: 'December 8, 2024',
                readTime: '3 min read',
                image: '/news-chef.jpg'
              },
              {
                title: 'Holiday Season Special Events Announced',
                excerpt: 'Discover our festive holiday events, including special dining experiences, spa packages, and family activities.',
                category: 'Events',
                date: 'December 5, 2024',
                readTime: '4 min read',
                image: '/news-holiday.jpg'
              },
              {
                title: 'Technology Upgrade: Smart Room Features',
                excerpt: 'All rooms now feature smart technology including voice-controlled lighting, climate control, and entertainment systems.',
                category: 'Technology',
                date: 'December 3, 2024',
                readTime: '3 min read',
                image: '/news-tech.jpg'
              },
              {
                title: 'Partnership with Local Art Galleries',
                excerpt: 'New collaboration brings rotating art exhibitions to our lobbies, showcasing local and international artists.',
                category: 'Culture',
                date: 'November 30, 2024',
                readTime: '3 min read',
                image: '/news-art.jpg'
              },
              {
                title: 'Wellness Program Expansion',
                excerpt: 'Our wellness programs now include yoga classes, meditation sessions, and personalized fitness coaching.',
                category: 'Wellness',
                date: 'November 28, 2024',
                readTime: '4 min read',
                image: '/news-wellness.jpg'
              },
              {
                title: 'New Loyalty Program Benefits',
                excerpt: 'Enhanced rewards for our valued guests including exclusive experiences, priority booking, and personalized services.',
                category: 'Loyalty',
                date: 'November 25, 2024',
                readTime: '3 min read',
                image: '/news-loyalty.jpg'
              }
            ].map((article, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">News Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {article.date}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Insights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industry Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert analysis and trends from the world of luxury hospitality and travel.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: 'The Future of Luxury Hospitality: 2024 Trends',
                author: 'By Sarah Johnson, CEO',
                excerpt: 'Explore the key trends shaping luxury hospitality in 2024, from sustainable practices to personalized guest experiences.',
                readTime: '8 min read',
                category: 'Industry Trends'
              },
              {
                title: 'Sustainable Tourism: Our Commitment to the Environment',
                author: 'By Michael Chen, COO',
                excerpt: 'Learn about our comprehensive approach to sustainable tourism and how we\'re reducing our environmental impact.',
                readTime: '6 min read',
                category: 'Sustainability'
              }
            ].map((insight, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200">
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {insight.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {insight.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {insight.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {insight.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {insight.readTime}
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Read Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest news, exclusive offers, and insider updates from Au-Lac Hotels.
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
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience Our Stories
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your stay and experience the luxury and excellence that makes the news.
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
