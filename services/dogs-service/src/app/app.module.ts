import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Dog } from './entities/dog.entity';
import { DogsRepository } from './repositories/dogs.repository';

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
      database: process.env.DB_NAME || 'buscamiperro_dogs',
      entities: [Dog],
      synchronize: true, // Solo en desarrollo
    }),
    TypeOrmModule.forFeature([Dog]),
  ],
  controllers: [DogsController],
  providers: [DogsService, DogsRepository],
  exports: [DogsService],
})
export class AppModule {}