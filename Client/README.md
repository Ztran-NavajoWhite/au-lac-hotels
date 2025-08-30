# Au-Lac Hotels - Next.js Frontend

A modern, responsive frontend application built with Next.js 14, TypeScript, and Tailwind CSS for the Au-Lac Hotels project.

## 🚀 **Features**

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive Design** for all devices
- **SEO Optimized** with metadata
- **Performance Optimized** with image optimization
- **Hot Module Replacement** for development
- **Docker Support** for containerization

## 🛠️ **Tech Stack**

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Utilities**: clsx, tailwind-merge

## 📋 **Prerequisites**

- Node.js 18+ 
- npm or yarn
- Docker (optional)

## 🚀 **Quick Start**

### **Option 1: Local Development**

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Option 2: Docker Development**

1. **Build and Start Container**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Access Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Option 3: Full Stack with Docker**

1. **Navigate to Main Project**
   ```bash
   cd ../Wordpress-Laravel
   ```

2. **Start All Services**
   ```bash
   docker-compose up -d
   ```

3. **Access Services**
   - **Frontend**: http://localhost:3000
   - **WordPress**: http://localhost:8081
   - **Laravel**: http://localhost:8000
   - **PHPMyAdmin**: http://localhost:8080

## 📁 **Project Structure**

```
Client/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # Reusable components
├── lib/                    # Utility libraries
├── types/                  # TypeScript type definitions
├── hooks/                  # Custom React hooks
├── utils/                  # Helper functions
├── styles/                 # Additional styles
├── public/                 # Static assets
├── Dockerfile              # Production Docker setup
├── docker-compose.dev.yml  # Development Docker setup
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🎨 **Design System**

### **Color Palette**
- **Primary**: Blue tones (#0ea5e9)
- **Secondary**: Purple tones (#d946ef)
- **Accent**: Orange tones (#f97316)
- **Neutral**: Gray tones (#171717)

### **Typography**
- **Sans**: Inter (UI elements)
- **Serif**: Playfair Display (Headings)

### **Components**
- **Buttons**: Primary, Secondary, Accent, Outline, Ghost
- **Cards**: Standard and hover variants
- **Forms**: Input fields with validation states
- **Layout**: Container and section utilities

## 🔧 **Configuration**

### **Environment Variables**
```bash
# API Endpoints
WORDPRESS_API_URL=http://localhost:8081/wp-json/wp/v2
LARAVEL_API_URL=http://localhost:8000/api
SITE_URL=http://localhost:3000

# Development
NODE_ENV=development
CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true
```

### **Next.js Config**
- **Standalone Output**: Enabled for Docker
- **Image Optimization**: WebP and AVIF support
- **API Routes**: Proxy configuration for backend services
- **Security Headers**: XSS protection and security policies

### **Tailwind Config**
- **Custom Colors**: Hotel brand palette
- **Custom Fonts**: Inter and Playfair Display
- **Custom Animations**: Fade, slide, and bounce effects
- **Custom Utilities**: Gradient text, backdrop blur, etc.

## 📱 **Responsive Design**

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 **Performance Features**

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Images and components
- **Bundle Analysis**: Webpack optimization
- **Caching**: Static asset caching

## 🔍 **SEO Features**

- **Metadata**: Dynamic meta tags
- **Open Graph**: Social media sharing
- **Twitter Cards**: Twitter sharing optimization
- **Structured Data**: JSON-LD markup
- **Sitemap**: Automatic generation
- **Robots.txt**: Search engine directives

## 🧪 **Development Workflow**

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### **Code Quality**
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Husky**: Git hooks (if configured)

## 🐳 **Docker Support**

### **Development Container**
```bash
# Build and run development container
docker-compose -f docker-compose.dev.yml up --build

# Stop container
docker-compose -f docker-compose.dev.yml down
```

### **Production Container**
```bash
# Build production image
docker build -t au-lac-nextjs .

# Run production container
docker run -p 3000:3000 au-lac-nextjs
```

## 🔌 **API Integration**

### **WordPress Integration**
- **Posts**: Fetch blog posts and content
- **Pages**: Static page content
- **Media**: Image and file management
- **Users**: User authentication

### **Laravel Integration**
- **Booking System**: Room reservations
- **User Management**: Authentication and profiles
- **Payment Processing**: Secure payment handling
- **Admin Panel**: Backend management

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Port Already in Use**
   ```bash
   # Kill process using port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Dependencies Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Remove node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Docker Issues**
   ```bash
   # Rebuild container
   docker-compose down
   docker-compose up --build
   ```

4. **TypeScript Errors**
   ```bash
   # Check types
   npm run type-check
   
   # Clear Next.js cache
   rm -rf .next
   ```

## 📚 **Additional Resources**

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

## 🤝 **Contributing**

1. Follow the existing code style
2. Use TypeScript for all new code
3. Write meaningful commit messages
4. Test your changes thoroughly
5. Update documentation as needed

## 📄 **License**

This project is part of the Au-Lac Hotels system and follows the same licensing terms.
