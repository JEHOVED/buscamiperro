import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { Conversation } from './entities/conversation.entity';
import { MessagesRepository } from './repositories/messages.repository';
import { ConversationsRepository } from './repositories/conversations.repository';

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
      database: process.env.DB_NAME || 'buscamiperro_chat',
      entities: [Message, Conversation],
      synchronize: true, // Solo en desarrollo
    }),
    TypeOrmModule.forFeature([Message, Conversation]),
  ],
  controllers: [MessagesController],
  providers: [ChatGateway, MessagesService, MessagesRepository, ConversationsRepository],
  exports: [MessagesService],
})
export class AppModule {}