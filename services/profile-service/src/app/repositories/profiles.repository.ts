import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfilesRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findById(id: string): Promise<Profile | null> {
    return await this.profileRepository.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Profile | null> {
    return await this.profileRepository.findOne({ where: { userId } });
  }

  async update(id: string, updateData: Partial<Profile>): Promise<Profile> {
    await this.profileRepository.update(id, updateData);
    return await this.profileRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.profileRepository.delete(id);
  }

  async search(query: any): Promise<Profile[]> {
    const where: any = {};
    
    if (query.fullName) {
      where.fullName = Like(`%${query.fullName}%`);
    }
    
    if (query.location) {
      where.location = Like(`%${query.location}%`);
    }
    
    if (query.isPublic !== undefined) {
      where.isPublic = query.isPublic === 'true';
    }
    
    return await this.profileRepository.find({ where });
  }
}