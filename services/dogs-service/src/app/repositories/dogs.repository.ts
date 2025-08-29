import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';

import { Dog, DogStatus } from '../entities/dog.entity';

@Injectable()
export class DogsRepository {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
  ) {}

  async create(dog: Dog): Promise<Dog> {
    return await this.dogRepository.save(dog);
  }

  async findAll(page: number = 1, limit: number = 10, status?: string): Promise<[Dog[], number]> {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (status) {
      where.status = status;
    }
    
    return await this.dogRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Dog | null> {
    return await this.dogRepository.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Dog[]> {
    return await this.dogRepository.find({ where: { userId } });
  }

  async update(id: string, updateData: Partial<Dog>): Promise<Dog> {
    await this.dogRepository.update(id, updateData);
    return await this.dogRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.dogRepository.delete(id);
  }

  async search(criteria: { 
    breed?: string; 
    size?: string; 
    color?: string; 
    location?: string 
  }): Promise<Dog[]> {
    const where: any = {};
    
    if (criteria.breed) {
      where.breed = Like(`%${criteria.breed}%`);
    }
    
    if (criteria.size) {
      where.size = criteria.size;
    }
    
    if (criteria.color) {
      where.color = Like(`%${criteria.color}%`);
    }
    
    // Para búsqueda por ubicación, podríamos implementar una búsqueda más compleja
    // que use PostGIS en el futuro
    
    return await this.dogRepository.find({ where });
  }
}