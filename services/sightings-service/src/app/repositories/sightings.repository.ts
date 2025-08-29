import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Sighting, SightingStatus } from '../entities/sighting.entity';

@Injectable()
export class SightingsRepository {
  constructor(
    @InjectRepository(Sighting)
    private readonly sightingRepository: Repository<Sighting>,
  ) {}

  async create(sighting: Sighting): Promise<Sighting> {
    return await this.sightingRepository.save(sighting);
  }

  async findAll(page: number = 1, limit: number = 10, dogId?: string, status?: string): Promise<[Sighting[], number]> {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (dogId) {
      where.dogId = dogId;
    }
    if (status) {
      where.status = status;
    }
    
    return await this.sightingRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: {
        dateTime: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Sighting | null> {
    return await this.sightingRepository.findOne({ where: { id } });
  }

  async findByDogId(dogId: string): Promise<Sighting[]> {
    return await this.sightingRepository.find({ 
      where: { dogId },
      order: {
        dateTime: 'DESC',
      },
    });
  }

  async findByUserId(userId: string): Promise<Sighting[]> {
    return await this.sightingRepository.find({ 
      where: { userId },
      order: {
        dateTime: 'DESC',
      },
    });
  }

  async update(id: string, updateData: Partial<Sighting>): Promise<Sighting> {
    await this.sightingRepository.update(id, updateData);
    return await this.sightingRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.sightingRepository.delete(id);
  }

  async findNearby(longitude: number, latitude: number, radius: number): Promise<Sighting[]> {
    // Esta consulta usa la fórmula de Haversine para calcular la distancia
    // En un entorno de producción con PostGIS, se podría usar ST_DWithin
    const radiusInDegrees = radius / 111320; // Aproximadamente 111.32 km por grado
    
    return await this.sightingRepository
      .createQueryBuilder('sighting')
      .where(
        `ST_Distance(
          ST_Point(:longitude, :latitude),
          ST_Point(sighting.longitude, sighting.latitude)
        ) <= :radiusInDegrees`,
        { longitude, latitude, radiusInDegrees }
      )
      .andWhere('sighting.status = :status', { status: SightingStatus.VERIFIED })
      .orderBy(
        `ST_Distance(
          ST_Point(:longitude, :latitude),
          ST_Point(sighting.longitude, sighting.latitude)
        )`,
        'ASC'
      )
      .getMany();
  }
}