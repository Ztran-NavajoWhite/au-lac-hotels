import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Au-Lac Hotels - Luxury Accommodations',
  description: 'Experience luxury and comfort at Au-Lac Hotels. Book your stay at our premium accommodations with world-class amenities and exceptional service.',
  keywords: 'hotels, luxury accommodation, booking, travel, hospitality',
  authors: [{ name: 'Au-Lac Hotels' }],
  creator: 'Au-Lac Hotels',
  publisher: 'Au-Lac Hotels',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Au-Lac Hotels - Luxury Accommodations',
    description: 'Experience luxury and comfort at Au-Lac Hotels. Book your stay at our premium accommodations with world-class amenities and exceptional service.',
    url: '/',
    siteName: 'Au-Lac Hotels',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Au-Lac Hotels',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Au-Lac Hotels - Luxury Accommodations',
    description: 'Experience luxury and comfort at Au-Lac Hotels. Book your stay at our premium accommodations with world-class amenities and exceptional service.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <div id="root">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
