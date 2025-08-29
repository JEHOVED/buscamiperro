import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Message } from '../entities/message.entity';

@Injectable()
export class MessagesRepository {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(message: Message): Promise<Message> {
    return await this.messageRepository.save(message);
  }

  async findByConversation(conversationId: string, page: number = 1, limit: number = 20): Promise<[Message[], number]> {
    const skip = (page - 1) * limit;
    
    return await this.messageRepository.findAndCount({
      where: { conversationId },
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findUnread(userId: string): Promise<Message[]> {
    return await this.messageRepository
      .createQueryBuilder('message')
      .where('message.senderId != :userId', { userId })
      .andWhere('message.isRead = false')
      .orderBy('message.createdAt', 'DESC')
      .getMany();
  }

  async markAsRead(conversationId: string, userId: string): Promise<void> {
    await this.messageRepository
      .createQueryBuilder()
      .update(Message)
      .set({ isRead: true })
      .where('conversationId = :conversationId', { conversationId })
      .andWhere('senderId != :userId', { userId })
      .andWhere('isRead = false')
      .execute();
  }
}