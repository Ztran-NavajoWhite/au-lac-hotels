# Au Lac Hotels

A comprehensive hotel management system built with Next.js frontend and Laravel backend, featuring WordPress integration for content management.

## 🏨 Project Overview

Au Lac Hotels is a modern hotel booking and management platform that combines the power of Next.js for the frontend user experience with Laravel for robust backend services, while leveraging WordPress for content management.

## 🚀 Features

- **Modern Frontend**: Built with Next.js and TypeScript
- **Robust Backend**: Laravel API with comprehensive hotel management
- **Content Management**: WordPress integration for easy content updates
- **Hotel Booking System**: Complete booking and reservation management
- **Payment Integration**: OnePay payment gateway support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Multi-hotel Support**: Manage multiple hotel properties

## 🏗️ Architecture

### Frontend (Client/)
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Component-based**: Modular, reusable components

### Backend (Wordpress-Laravel/)
- **Laravel 10**: PHP framework for API development
- **WordPress**: Content management system
- **Database**: MySQL/PostgreSQL support
- **API-first**: RESTful API architecture

## 📁 Project Structure

```
Au-Lac-Hotels/
├── Client/                 # Next.js frontend application
│   ├── app/               # App Router pages
│   ├── components/        # Reusable React components
│   ├── public/            # Static assets
│   └── utils/             # Utility functions
├── Wordpress-Laravel/     # Backend services
│   ├── Laravel/           # Laravel application
│   ├── Wordpress/         # WordPress installation
│   └── Database/          # Database schemas
└── README.md              # This file
```

## 🛠️ Technology Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- React Hook Form
- Framer Motion

### Backend
- Laravel 10
- PHP 8.1+
- MySQL/PostgreSQL
- WordPress 6.0+

### Development Tools
- Docker
- Composer
- npm/yarn
- Git

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PHP 8.1+
- Composer
- Docker (optional)
- MySQL/PostgreSQL

### Frontend Setup
```bash
cd Client/
npm install
npm run dev
```

### Backend Setup
```bash
cd Wordpress-Laravel/
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

### WordPress Setup
```bash
cd Wordpress-Laravel/Wordpress/
# Configure wp-config.php with your database settings
# Access WordPress admin at /wp-admin
```

## 🔧 Configuration

### Environment Variables
Create `.env` files in both `Client/` and `Wordpress-Laravel/Laravel/` directories:

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8000/wordpress
```

**Backend (.env)**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=au_lac_hotels
DB_USERNAME=root
DB_PASSWORD=
```

## 📱 Available Pages

- **Home**: Landing page with hotel overview
- **Hotels**: List of available hotels
- **Hotel Details**: Individual hotel information
- **Booking**: Room reservation system
- **Checkout**: Payment and confirmation
- **Gallery**: Hotel photo galleries
- **News**: Latest updates and announcements
- **Services**: Available amenities and services
- **Contact**: Contact information and forms

## 🏨 Hotel Properties

- **Au Lac Charner Hotel**: Premium city center accommodation
- **Au Lac Legend Hotel**: Luxury resort experience
- **Ngon Cafe**: Fine dining establishment

## 🔐 Authentication

- User registration and login
- Role-based access control
- Secure session management
- Password reset functionality

## 💳 Payment System

- OnePay payment gateway integration
- Secure transaction processing
- Multiple payment methods
- Booking confirmation system

## 🐳 Docker Support

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

## 📊 Database Schema

The system includes comprehensive database models for:
- Users and authentication
- Hotels and room types
- Bookings and reservations
- Payments and transactions
- Content management

## 🧪 Testing

```bash
# Frontend tests
cd Client/
npm run test

# Backend tests
cd Wordpress-Laravel/Laravel/
php artisan test
```

## 📈 Performance

- **Frontend**: Next.js optimization with Image component
- **Backend**: Laravel caching and database optimization
- **Assets**: Optimized images and static files
- **SEO**: Meta tags and structured data

## 🔒 Security

- Input validation and sanitization
- CSRF protection
- SQL injection prevention
- XSS protection
- Secure authentication

## 🌐 Deployment

### Frontend
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront

### Backend
- DigitalOcean
- AWS EC2
- Heroku
- VPS with cPanel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For technical support or questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core functionality
- **v1.1.0**: Added payment gateway integration
- **v1.2.0**: Enhanced booking system and UI improvements

---

**Built with ❤️ for Au Lac Hotels**
