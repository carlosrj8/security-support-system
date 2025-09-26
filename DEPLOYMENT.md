# Deployment Guide - Security Support System

## Prerequisites

### System Requirements
- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **MongoDB**: 6.0 or higher
- **Memory**: Minimum 4GB RAM
- **Storage**: Minimum 10GB free space

### Development Environment
- **OS**: Windows 10/11, macOS, or Linux
- **IDE**: VS Code (recommended)
- **Browser**: Chrome, Firefox, or Edge (latest versions)

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd security-support-system
```

### 2. Install Dependencies
```bash
# Install root dependencies and all sub-projects
npm run install:all
```

### 3. Environment Configuration

#### Backend Configuration
Create `.env` file in the `backend` directory:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost/security-support

# Application
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1d

# OpenAI API Key (for AI features)
OPENAI_API_KEY=your-openai-api-key

# WhatsApp Business API (optional)
WHATSAPP_API_URL=https://api.whatsapp.com/send
WHATSAPP_TOKEN=your-whatsapp-token

# Telegram Bot API (optional)
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
```

#### Frontend Configuration
Create `.env` file in the `frontend` directory:
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_SOCKET_URL=http://localhost:3000
REACT_APP_VERSION=1.0.0
```

### 4. Database Setup

#### Install MongoDB
**Windows:**
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings
3. Start MongoDB service

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Initialize Database
The application will automatically create the necessary collections on first run.

## Development

### Start Development Servers
```bash
# Start both frontend and backend simultaneously
npm run dev
```

This will start:
- Backend API server on http://localhost:3000
- Frontend React app on http://localhost:3001

### Individual Services
```bash
# Backend only
npm run backend:dev

# Frontend only
npm run frontend:dev
```

### Testing
```bash
# Run all tests
npm test

# Backend tests only
npm run backend:test

# Frontend tests only
npm run frontend:test
```

### Linting
```bash
# Run linting for all projects
npm run lint

# Backend linting
npm run backend:lint

# Frontend linting
npm run frontend:lint
```

## Production Deployment

### 1. Build Applications
```bash
# Build backend
npm run backend:build

# Build frontend
npm run frontend:build
```

### 2. Environment Variables (Production)
Update environment variables for production:

**Backend (.env):**
```env
MONGODB_URI=mongodb://your-production-mongodb-uri
NODE_ENV=production
JWT_SECRET=your-production-jwt-secret
PORT=3000
```

**Frontend (.env.production):**
```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_SOCKET_URL=https://your-api-domain.com
```

### 3. Docker Deployment (Recommended)

#### Create Docker Compose
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6.0
    container_name: security-support-db
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

  backend:
    build: ./backend
    container_name: security-support-api
    restart: always
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
    environment:
      MONGODB_URI: mongodb://admin:password@mongodb:27017/security-support?authSource=admin
      NODE_ENV: production

  frontend:
    build: ./frontend
    container_name: security-support-web
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

#### Deploy with Docker
```bash
docker-compose up -d
```

### 4. Traditional Server Deployment

#### Install PM2 (Process Manager)
```bash
npm install -g pm2
```

#### Start Backend
```bash
cd backend
pm2 start dist/main.js --name "security-support-api"
```

#### Serve Frontend
Use nginx or Apache to serve the built frontend files from `frontend/build/`.

**Nginx Configuration Example:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/frontend/build;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring and Maintenance

### Health Checks
- Backend health: `GET http://localhost:3000/health`
- Database connection: Check MongoDB logs
- Frontend: Access web interface

### Logs
```bash
# Backend logs (PM2)
pm2 logs security-support-api

# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Backup
```bash
# MongoDB backup
mongodump --uri="mongodb://localhost/security-support" --out=/backup/path

# Restore
mongorestore --uri="mongodb://localhost/security-support" /backup/path/security-support
```

### Updates
```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm run install:all

# Rebuild applications
npm run backend:build
npm run frontend:build

# Restart services
pm2 restart security-support-api
# or
docker-compose restart
```

## Troubleshooting

### Common Issues

#### Backend won't start
1. Check MongoDB connection
2. Verify environment variables
3. Check port availability (3000)
4. Review logs for specific errors

#### Frontend build fails
1. Clear node_modules and reinstall
2. Check TypeScript errors
3. Verify environment variables
4. Update dependencies if needed

#### Database connection issues
1. Verify MongoDB is running
2. Check connection string format
3. Verify network connectivity
4. Check authentication credentials

### Performance Optimization

#### Backend
- Enable MongoDB indexing
- Implement caching (Redis)
- Use compression middleware
- Optimize database queries

#### Frontend
- Enable gzip compression
- Implement code splitting
- Use CDN for static assets
- Optimize images and assets

## Security Considerations

### Production Security
1. **Environment Variables**: Never commit sensitive data
2. **HTTPS**: Always use SSL/TLS in production
3. **Authentication**: Implement proper JWT validation
4. **CORS**: Configure appropriate CORS policies
5. **Rate Limiting**: Implement API rate limiting
6. **Input Validation**: Validate all user inputs
7. **Database Security**: Use MongoDB authentication
8. **Firewall**: Configure proper firewall rules

### Regular Maintenance
- Update dependencies regularly
- Monitor security vulnerabilities
- Backup data regularly
- Monitor system performance
- Review access logs

## Support

### Documentation
- API Documentation: `/docs` endpoint (Swagger)
- Agent Manual: `docs/agent-manual.md`
- Technical Manual: `docs/technical-manual.md`
- Service Manual: `docs/service-manual.md`

### Contact
- Technical Support: support@company.com
- Emergency: +55 11 9999-9999
- Documentation: docs@company.com

### Version History
- v1.0.0: Initial release with core multi-agent functionality
- Future versions will include enhanced AI capabilities and mobile apps
