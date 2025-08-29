import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SightingsController } from './sightings.controller';
import { SightingsService } from './sightings.service';
import { Sighting } from './entities/sighting.entity';
import { SightingsRepository } from './repositories/sightings.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'buscamiperro_sightings',
      entities: [Sighting],
      synchronize: true, // Solo en desarrollo
    }),
    TypeOrmModule.forFeature([Sighting]),
  ],
  controllers: [SightingsController],
  providers: [SightingsService, SightingsRepository],
  exports: [SightingsService],
})
export class AppModule {}