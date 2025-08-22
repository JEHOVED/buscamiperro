import { Injectable } from '@nestjs/common';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
  getHealth() {
    return {
      message: 'BuscaMiPerro API Gateway is running!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime(),
      environment: environment.production ? 'production' : 'development'
    };
  }

  getStatus() {
    return {
      status: 'healthy',
      services: {
        auth: { url: environment.services.auth, status: 'unknown' },
        dogs: { url: environment.services.dogs, status: 'unknown' },
        sightings: { url: environment.services.sightings, status: 'unknown' },
        match: { url: environment.services.match, status: 'unknown' },
        chat: { url: environment.services.chat, status: 'unknown' },
        notifications: { url: environment.services.notifications, status: 'unknown' },
        profile: { url: environment.services.profile, status: 'unknown' },
        reports: { url: environment.services.reports, status: 'unknown' }
      },
      timestamp: new Date().toISOString()
    };
  }
}