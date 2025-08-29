import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Notification } from '../entities/notification.entity';

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(notification: Notification): Promise<Notification> {
    return await this.notificationRepository.save(notification);
  }

  async findAll(userId: string, page: number = 1, limit: number = 20, isRead?: boolean): Promise<[Notification[], number]> {
    const skip = (page - 1) * limit;
    
    const where: any = { userId };
    if (isRead !== undefined) {
      where.isRead = isRead;
    }
    
    return await this.notificationRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Notification | null> {
    return await this.notificationRepository.findOne({ where: { id } });
  }

  async update(id: string, updateData: Partial<Notification>): Promise<Notification> {
    await this.notificationRepository.update(id, updateData);
    return await this.notificationRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.notificationRepository.delete(id);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository
      .createQueryBuilder()
      .update(Notification)
      .set({ isRead: true })
      .where('userId = :userId', { userId })
      .andWhere('isRead = false')
      .execute();
  }
}