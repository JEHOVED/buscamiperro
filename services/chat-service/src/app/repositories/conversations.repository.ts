import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Conversation } from '../entities/conversation.entity';

@Injectable()
export class ConversationsRepository {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async create(conversation: Conversation): Promise<Conversation> {
    return await this.conversationRepository.save(conversation);
  }

  async findById(id: string): Promise<Conversation | null> {
    return await this.conversationRepository.findOne({ where: { id } });
  }

  async findByUser(userId: string): Promise<Conversation[]> {
    return await this.conversationRepository
      .createQueryBuilder('conversation')
      .where(':userId = ANY(conversation.participantIds)', { userId })
      .orderBy('conversation.lastActivityAt', 'DESC')
      .getMany();
  }

  async updateLastActivity(conversationId: string): Promise<void> {
    await this.conversationRepository
      .createQueryBuilder()
      .update(Conversation)
      .set({ lastActivityAt: () => 'CURRENT_TIMESTAMP' })
      .where('id = :conversationId', { conversationId })
      .execute();
  }
}