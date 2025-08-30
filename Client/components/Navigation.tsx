'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHotelsDropdownOpen, setIsHotelsDropdownOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Story', href: '/story' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Services', href: '/services' },
    { name: 'News', href: '/news' },
    { name: 'Offers', href: '/offers' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  const hotelSubItems = [
    { name: 'Au Lac Legend', href: '/hotels/au-lac-legend' },
    { name: 'Au Lac Charner', href: '/hotels/au-lac-charner' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Top Navigation Bar - Authentication */}
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-10">
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AL</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Au-Lac Hotels</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.name === 'Hotels' ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsHotelsDropdownOpen(true)}
                      onMouseLeave={() => setIsHotelsDropdownOpen(false)}
                    >
                      <button
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                          isActive(item.href)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {item.name}
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {isHotelsDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                          <div className="py-1">
                            <Link
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                              All Hotels
                            </Link>
                            {hotelSubItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/booking"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                {/* Mobile Authentication Buttons */}
                <div className="flex gap-2 mb-4 pb-4 border-b border-gray-200">
                  <Link
                    href="/login"
                    className="flex-1 text-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>

                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.name === 'Hotels' ? (
                      <div>
                        <Link
                          href={item.href}
                          className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                            isActive(item.href)
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <div className="ml-4 space-y-1">
                          {hotelSubItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              • {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Link
                    href="/booking"
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navigation
