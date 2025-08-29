import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { MatchesRepository } from './repositories/matches.repository';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchesService {
  constructor(private readonly matchesRepository: MatchesRepository) {}

  async create(createMatchDto: CreateMatchDto, userId: string): Promise<any> {
    try {
      const match = new Match();
      Object.assign(match, createMatchDto);
      match.userId = userId;
      
      const savedMatch = await this.matchesRepository.create(match);
      
      return {
        success: true,
        message: 'Coincidencia creada exitosamente',
        data: savedMatch,
      };
    } catch (error) {
      throw new BadRequestException('Error al crear la coincidencia');
    }
  }

  async findAll(page: number = 1, limit: number = 10, dogId?: string, sightingId?: string, status?: string): Promise<any> {
    try {
      const [matches, total] = await this.matchesRepository.findAll(page, limit, dogId, sightingId, status);
      
      return {
        success: true,
        data: matches,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error('Error al obtener la lista de coincidencias');
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const match = await this.matchesRepository.findById(id);
      if (!match) {
        throw new NotFoundException('Coincidencia no encontrada');
      }
      
      return {
        success: true,
        data: match,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al obtener la coincidencia');
    }
  }

  async update(id: string, updateMatchDto: UpdateMatchDto, userId: string): Promise<any> {
    try {
      const match = await this.matchesRepository.findById(id);
      if (!match) {
        throw new NotFoundException('Coincidencia no encontrada');
      }
      
      // Verificar que el usuario tenga permiso para actualizar
      if (match.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      const updatedMatch = await this.matchesRepository.update(id, updateMatchDto);
      
      return {
        success: true,
        message: 'Coincidencia actualizada exitosamente',
        data: updatedMatch,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar la coincidencia');
    }
  }

  async remove(id: string, userId: string): Promise<any> {
    try {
      const match = await this.matchesRepository.findById(id);
      if (!match) {
        throw new NotFoundException('Coincidencia no encontrada');
      }
      
      // Verificar que el usuario tenga permiso para eliminar
      if (match.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      await this.matchesRepository.remove(id);
      
      return {
        success: true,
        message: 'Coincidencia eliminada exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al eliminar la coincidencia');
    }
  }

  async calculateMatches(userId: string): Promise<any> {
    try {
      // Este método calcularía coincidencias basadas en algoritmos de matching
      // Por ahora retornamos un placeholder
      const matches = await this.matchesRepository.calculateNewMatches(userId);
      
      return {
        success: true,
        message: 'Coincidencias calculadas exitosamente',
        data: matches,
      };
    } catch (error) {
      throw new Error('Error al calcular coincidencias');
    }
  }

  async findByDog(dogId: string): Promise<any> {
    try {
      const matches = await this.matchesRepository.findByDogId(dogId);
      
      return {
        success: true,
        data: matches,
      };
    } catch (error) {
      throw new Error('Error al obtener las coincidencias del perro');
    }
  }

  async findBySighting(sightingId: string): Promise<any> {
    try {
      const matches = await this.matchesRepository.findBySightingId(sightingId);
      
      return {
        success: true,
        data: matches,
      };
    } catch (error) {
      throw new Error('Error al obtener las coincidencias del avistamiento');
    }
  }

  async findByUser(userId: string): Promise<any> {
    try {
      const matches = await this.matchesRepository.findByUserId(userId);
      
      return {
        success: true,
        data: matches,
      };
    } catch (error) {
      throw new Error('Error al obtener las coincidencias del usuario');
    }
  }
}