import { Injectable, BadRequestException } from '@nestjs/common';
import { ElasticsearchService } from './services/elasticsearch.service';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async search(searchDto: SearchDto, userId: string): Promise<any> {
    try {
      const results = await this.elasticsearchService.search(searchDto, userId);
      
      return {
        success: true,
        data: results.data,
        pagination: results.pagination,
        facets: results.facets,
      };
    } catch (error) {
      throw new BadRequestException('Error al realizar la búsqueda');
    }
  }

  async getSuggestions(query: string, userId: string): Promise<any> {
    try {
      const suggestions = await this.elasticsearchService.getSuggestions(query, userId);
      
      return {
        success: true,
        data: suggestions,
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener sugerencias');
    }
  }

  async indexData(indexData: any, userId: string): Promise<any> {
    try {
      // Verificar permisos de administrador (solo admins pueden indexar datos)
      if (!this.isAdmin(userId)) {
        throw new BadRequestException('No autorizado para indexar datos');
      }
      
      await this.elasticsearchService.indexData(indexData);
      
      return {
        success: true,
        message: 'Datos indexados exitosamente',
      };
    } catch (error) {
      if (error.message === 'No autorizado para indexar datos') {
        throw error;
      }
      throw new BadRequestException('Error al indexar datos');
    }
  }

  async autocomplete(query: string, userId: string): Promise<any> {
    try {
      const results = await this.elasticsearchService.autocomplete(query, userId);
      
      return {
        success: true,
        data: results,
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener autocompletado');
    }
  }

  private isAdmin(userId: string): boolean {
    // En una implementación real, esto verificaría los roles del usuario
    // Por ahora retornamos false para simular un usuario normal
    return false;
  }
}