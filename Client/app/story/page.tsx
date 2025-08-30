export default function StoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Story
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover the journey that shaped Au-Lac Hotels into the premier hospitality destination it is today
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              A Legacy of Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to international recognition, our story is one of passion, innovation, and unwavering commitment to guest satisfaction.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                year: '1995',
                title: 'The Beginning',
                description: 'Founded with a vision to create exceptional hospitality experiences that blend local culture with international standards.',
                image: '/story-1995.jpg'
              },
              {
                year: '2005',
                title: 'Expansion Era',
                description: 'Opened our second property, marking the beginning of our expansion across the region.',
                image: '/story-2005.jpg'
              },
              {
                year: '2015',
                title: 'Innovation & Technology',
                description: 'Introduced cutting-edge technology and sustainable practices, setting new industry standards.',
                image: '/story-2015.jpg'
              },
              {
                year: '2023',
                title: 'Global Recognition',
                description: 'Achieved international acclaim and expanded our portfolio to serve guests worldwide.',
                image: '/story-2023.jpg'
              }
            ].map((milestone, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
                <div className="lg:w-1/2">
                  <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-lg">Image Placeholder</span>
                  </div>
                </div>
                <div className="lg:w-1/2 text-center lg:text-left">
                  <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    {milestone.year}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every service we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'We strive for perfection in every detail, from room cleanliness to guest service.',
                icon: '⭐'
              },
              {
                title: 'Integrity',
                description: 'Honest, transparent, and ethical in all our business practices and guest interactions.',
                icon: '🤝'
              },
              {
                title: 'Innovation',
                description: 'Continuously improving and adopting new technologies to enhance guest experiences.',
                icon: '💡'
              },
              {
                title: 'Sustainability',
                description: 'Committed to environmental responsibility and sustainable hospitality practices.',
                icon: '🌱'
              },
              {
                title: 'Community',
                description: 'Supporting local communities and contributing to regional development.',
                icon: '🏘️'
              },
              {
                title: 'Guest Focus',
                description: 'Every decision is made with our guests\' comfort and satisfaction in mind.',
                icon: '❤️'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to maintaining our high standards and driving innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                position: 'Chief Executive Officer',
                bio: '20+ years of hospitality leadership experience with a passion for guest satisfaction.',
                image: '/team-sarah.jpg'
              },
              {
                name: 'Michael Chen',
                position: 'Chief Operations Officer',
                bio: 'Expert in hotel operations and efficiency optimization.',
                image: '/team-michael.jpg'
              },
              {
                name: 'Emily Rodriguez',
                position: 'Director of Guest Services',
                bio: 'Dedicated to creating memorable experiences for every guest.',
                image: '/team-emily.jpg'
              }
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Photo</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Be Part of Our Story
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the legacy of excellence and create your own unforgettable memories with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Book Your Stay
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
