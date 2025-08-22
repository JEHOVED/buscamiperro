import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DogsModule } from './dogs/dogs.module';
import { SightingsModule } from './sightings/sightings.module';
import { MatchModule } from './match/match.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProfileModule } from './profile/profile.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    AuthModule,
    DogsModule,
    SightingsModule,
    MatchModule,
    ChatModule,
    NotificationsModule,
    ProfileModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}