/** @type {import('next').NextConfig} */
const nextConfig = {
  // No standalone output needed for local development
  output: undefined,
  
  // Force Next.js to bind to all interfaces
  serverRuntimeConfig: {
    hostname: '0.0.0.0',
    port: 3000,
  },
  
  // Enable experimental features
  experimental: {
    // App Router is now stable in Next.js 14, no need for appDir flag
  },
  
  // Environment variables
  env: {
    // API endpoints - direct access to Docker services
    NEXT_PUBLIC_WORDPRESS_API_URL: process.env.WORDPRESS_API_URL || 'http://localhost:8081/wp-json/wp/v2',
    NEXT_PUBLIC_LARAVEL_API_URL: process.env.LARAVEL_API_URL || 'http://localhost:8000/api',
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
  },
  
  // Image optimization
  images: {
    domains: ['localhost', 'your-domain.com'], // Add your domains here
    formats: ['image/webp', 'image/avif'],
  },
  
  // API routes - direct proxy to backend services
  async rewrites() {
    return [
      // Proxy WordPress API requests directly to WordPress
      {
        source: '/api/wordpress/:path*',
        destination: 'http://localhost:8081/wp-json/wp/v2/:path*',
      },
      // Proxy Laravel API requests directly to Laravel
      {
        source: '/api/laravel/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;
