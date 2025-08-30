# Au-Lac Hotels Development Setup

This setup separates the backend services (running in Docker) from the frontend (Next.js running locally).

## Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Next.js      │    │   Docker        │
│   (Local)      │◄──►│   Backend       │
│   Port 3000    │    │   Services      │
└─────────────────┘    └─────────────────┘
```

## Quick Start

### 1. Start Backend Services (Docker)

```bash
# Navigate to Wordpress-Laravel directory
cd Wordpress-Laravel

# Start all backend services
docker-compose up -d

# Check status
docker-compose ps
```

**Backend Services:**
- **MySQL**: localhost:3307
- **Redis**: localhost:6379
- **PHPMyAdmin**: localhost:8080
- **Laravel**: localhost:8000
- **WordPress**: localhost:8081

### 2. Start Frontend (Local Development)

```bash
# In a new terminal, navigate to Client directory
cd Client

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Frontend:**
- **Next.js**: localhost:3000

## Development Workflow

### Backend Development
- **Laravel**: Edit files in `Wordpress-Laravel/Laravel/`
- **WordPress**: Edit files in `Wordpress-Laravel/Wordpress/`
- Changes reflect immediately due to volume mounting

### Frontend Development
- **Next.js**: Edit files in `Client/`
- Hot reload works perfectly
- Connects directly to Docker backend services

## API Endpoints

### WordPress API
- **Direct Access**: http://localhost:8081/wp-json/wp/v2
- **From Next.js**: `/api/wordpress/*`

### Laravel API
- **Direct Access**: http://localhost:8000/api
- **From Next.js**: `/api/laravel/*`

## Useful Commands

### Docker Backend
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild services
docker-compose up --build -d

# Access container shell
docker exec -it au_lac_laravel sh
docker exec -it au_lac_wordpress sh
```

### Local Frontend
```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check
```

## Troubleshooting

### Backend Issues
1. **Port conflicts**: Ensure ports 3307, 6379, 8000, 8080, 8081 are available
2. **Database connection**: Wait for MySQL to fully initialize (1-2 minutes)
3. **Composer issues**: Check Laravel container logs

### Frontend Issues
1. **API connection**: Ensure Docker backend is running
2. **Port 3000**: Make sure no other service uses port 3000
3. **Dependencies**: Run `npm install` if packages are missing

## Production Deployment

For production, you can:
1. **Build Next.js**: `npm run build`
2. **Use Docker**: Include Next.js in docker-compose for production
3. **Use Nginx**: Add nginx back for production reverse proxy

## Benefits of This Setup

✅ **Fast Frontend Development**: Hot reload, instant feedback
✅ **Stable Backend**: Docker containers, consistent environment
✅ **Easy Debugging**: Separate concerns, clear separation
✅ **Team Collaboration**: Backend developers use Docker, frontend developers use local Node.js
✅ **Production Ready**: Easy to switch to full Docker setup when needed
✅ **Simplified**: No nginx complexity during development
