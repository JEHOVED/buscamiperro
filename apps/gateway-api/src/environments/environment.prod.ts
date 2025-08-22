export const environment = {
  production: true,
  port: process.env.PORT || 3000,
  globalPrefix: 'api',
  
  // Microservices URLs (from environment variables)
  services: {
    auth: process.env.AUTH_SERVICE_URL || 'http://auth-service:3001',
    dogs: process.env.DOGS_SERVICE_URL || 'http://dogs-service:3002',
    sightings: process.env.SIGHTINGS_SERVICE_URL || 'http://sightings-service:3003',
    match: process.env.MATCH_SERVICE_URL || 'http://match-service:3004',
    chat: process.env.CHAT_SERVICE_URL || 'http://chat-service:3005',
    notifications: process.env.NOTIFICATIONS_SERVICE_URL || 'http://notifications-service:3006',
    profile: process.env.PROFILE_SERVICE_URL || 'http://profile-service:3007',
    reports: process.env.REPORTS_SERVICE_URL || 'http://reports-service:3008'
  },
  
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-jwt-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },
  
  // Rate limiting
  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL) || 60000,
    limit: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  },
  
  // CORS
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['https://buscamiperro.com'],
    credentials: true
  },
  
  // Swagger (disabled in production)
  swagger: {
    enabled: false
  }
};