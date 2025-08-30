import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AL</span>
              </div>
              <span className="text-xl font-bold">Au-Lac Hotels</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Experience luxury and comfort at our world-class hotels. We provide exceptional service and unforgettable experiences for discerning travelers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-xs">f</span>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <span className="text-xs">𝕏</span>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <span className="text-xs">📷</span>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-xs">in</span>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/story" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white transition-colors text-sm">
                  News
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Room Booking
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Conference Rooms
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Spa & Wellness
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Fine Dining
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Airport Transfer
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Concierge Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 mt-1">📍</span>
                <div>
                  <p className="text-gray-300 text-sm">123 Luxury Avenue</p>
                  <p className="text-gray-300 text-sm">Business District</p>
                  <p className="text-gray-300 text-sm">City, Country 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📞</span>
                <a href="tel:+15551234567" className="text-gray-300 hover:text-white transition-colors text-sm">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">✉️</span>
                <a href="mailto:info@aulachotels.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                  info@aulachotels.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">🌐</span>
                <a href="https://www.aulachotels.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                  www.aulachotels.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-300 mb-6 text-sm">
              Subscribe to our newsletter for exclusive offers and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Au-Lac Hotels. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
