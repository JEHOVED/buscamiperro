import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'API is healthy',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        timestamp: { type: 'string' },
        version: { type: 'string' },
        uptime: { type: 'number' }
      }
    }
  })
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('status')
  @ApiOperation({ summary: 'Detailed status check' })
  @ApiResponse({ 
    status: 200, 
    description: 'Detailed API status',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        services: { type: 'object' },
        timestamp: { type: 'string' }
      }
    }
  })
  getStatus() {
    return this.appService.getStatus();
  }
}