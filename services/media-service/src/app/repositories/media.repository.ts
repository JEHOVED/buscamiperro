import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MediaFile } from '../entities/media.entity';

@Injectable()
export class MediaRepository {
  constructor(
    @InjectRepository(MediaFile)
    private readonly mediaRepository: Repository<MediaFile>,
  ) {}

  async create(mediaFile: MediaFile): Promise<MediaFile> {
    return await this.mediaRepository.save(mediaFile);
  }

  async findById(id: string): Promise<MediaFile | null> {
    return await this.mediaRepository.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<MediaFile[]> {
    return await this.mediaRepository.find({ 
      where: { userId },
      order: {
        uploadedAt: 'DESC',
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.mediaRepository.delete(id);
  }
}