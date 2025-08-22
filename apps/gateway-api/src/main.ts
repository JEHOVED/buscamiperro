import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import rateLimit from 'express-rate-limit';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.use(compression());

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: environment.rateLimit.ttl,
      max: environment.rateLimit.limit,
      message: {
        error: 'Too many requests',
        message: 'Please try again later'
      }
    })
  );

  // CORS
  app.enableCors(environment.cors);

  // Global prefix
  app.setGlobalPrefix(environment.globalPrefix);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger documentation (only in development)
  if (!environment.production && environment.swagger) {
    const config = new DocumentBuilder()
      .setTitle(environment.swagger.title)
      .setDescription(environment.swagger.description)
      .setVersion(environment.swagger.version)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(environment.swagger.path, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    console.log(`📚 Swagger documentation available at: http://localhost:${environment.port}/${environment.swagger.path}`);
  }

  // Start server
  await app.listen(environment.port);
  
  console.log(`🚀 Gateway API is running on: http://localhost:${environment.port}/${environment.globalPrefix}`);
  console.log(`🌍 Environment: ${environment.production ? 'production' : 'development'}`);
}

bootstrap().catch((error) => {
  console.error('❌ Error starting the application:', error);
  process.exit(1);
});