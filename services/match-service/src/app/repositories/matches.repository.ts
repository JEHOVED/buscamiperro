import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Match, MatchStatus } from '../entities/match.entity';

@Injectable()
export class MatchesRepository {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  async create(match: Match): Promise<Match> {
    return await this.matchRepository.save(match);
  }

  async findAll(page: number = 1, limit: number = 10, dogId?: string, sightingId?: string, status?: string): Promise<[Match[], number]> {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (dogId) {
      where.dogId = dogId;
    }
    if (sightingId) {
      where.sightingId = sightingId;
    }
    if (status) {
      where.status = status;
    }
    
    return await this.matchRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Match | null> {
    return await this.matchRepository.findOne({ where: { id } });
  }

  async findByDogId(dogId: string): Promise<Match[]> {
    return await this.matchRepository.find({ 
      where: { dogId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findBySightingId(sightingId: string): Promise<Match[]> {
    return await this.matchRepository.find({ 
      where: { sightingId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByUserId(userId: string): Promise<Match[]> {
    return await this.matchRepository.find({ 
      where: { userId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(id: string, updateData: Partial<Match>): Promise<Match> {
    await this.matchRepository.update(id, updateData);
    return await this.matchRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.matchRepository.delete(id);
  }

  async calculateNewMatches(userId: string): Promise<Match[]> {
    // Este método calcularía nuevas coincidencias usando algoritmos de matching
    // Por ahora retornamos un array vacío como placeholder
    return [];
  }
}