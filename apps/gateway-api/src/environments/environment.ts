export const environment = {
  production: false,
  port: 3000,
  globalPrefix: 'api',
  
  // Microservices URLs
  services: {
    auth: 'http://localhost:3001',
    dogs: 'http://localhost:3002',
    sightings: 'http://localhost:3003',
    match: 'http://localhost:3004',
    chat: 'http://localhost:3005',
    notifications: 'http://localhost:3006',
    profile: 'http://localhost:3007',
    reports: 'http://localhost:3008'
  },
  
  // JWT Configuration
  jwt: {
    secret: 'your-jwt-secret-key-change-in-production',
    expiresIn: '1h',
    refreshExpiresIn: '7d'
  },
  
  // Rate limiting
  rateLimit: {
    ttl: 60000, // 1 minute
    limit: 100, // requests per ttl
  },
  
  // CORS
  cors: {
    origin: ['http://localhost:4200'],
    credentials: true
  },
  
  // Swagger
  swagger: {
    title: 'BuscaMiPerro API',
    description: 'API Gateway para la aplicación BuscaMiPerro',
    version: '1.0',
    path: 'docs'
  }
};