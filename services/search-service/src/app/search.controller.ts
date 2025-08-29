import { Controller, Get, Post, Body, Query, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  @ApiOperation({ summary: 'Realizar una búsqueda avanzada' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Resultados de la búsqueda' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async search(@Body() searchDto: SearchDto, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub; // Obtener ID del usuario del token JWT
      const result = await this.searchService.search(searchDto, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Realizar una búsqueda rápida' })
  @ApiQuery({ name: 'q', required: true, type: String })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Resultados de la búsqueda' })
  async quickSearch(
    @Query('q') query: string,
    @Query('type') type?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      if (!query) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'El parámetro de búsqueda es requerido',
        });
      }
      
      const userId = (req.user as any).sub;
      const searchDto: SearchDto = {
        query,
        type,
        page,
        limit,
      };
      
      const result = await this.searchService.search(searchDto, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get('suggestions')
  @ApiOperation({ summary: 'Obtener sugerencias de búsqueda' })
  @ApiQuery({ name: 'q', required: true, type: String })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Sugerencias de búsqueda' })
  async getSuggestions(@Query('q') query: string, @Req() req: Request, @Res() res: Response) {
    try {
      if (!query) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'El parámetro de búsqueda es requerido',
        });
      }
      
      const userId = (req.user as any).sub;
      const result = await this.searchService.getSuggestions(query, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Post('index')
  @ApiOperation({ summary: 'Indexar datos en el motor de búsqueda' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Datos indexados exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async indexData(@Body() indexData: any, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.searchService.indexData(indexData, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get('autocomplete')
  @ApiOperation({ summary: 'Obtener autocompletado para búsqueda' })
  @ApiQuery({ name: 'q', required: true, type: String })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Resultados de autocompletado' })
  async autocomplete(@Query('q') query: string, @Req() req: Request, @Res() res: Response) {
    try {
      if (!query) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'El parámetro de búsqueda es requerido',
        });
      }
      
      const userId = (req.user as any).sub;
      const result = await this.searchService.autocomplete(query, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }
}