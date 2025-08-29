import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva coincidencia' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Coincidencia creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createMatchDto: CreateMatchDto, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub; // Obtener ID del usuario del token JWT
      const result = await this.matchesService.create(createMatchDto, userId);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de coincidencias' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'dogId', required: false, type: String })
  @ApiQuery({ name: 'sightingId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de coincidencias' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('dogId') dogId?: string,
    @Query('sightingId') sightingId?: string,
    @Query('status') status?: string,
    @Res() res: Response
  ) {
    try {
      const result = await this.matchesService.findAll(page, limit, dogId, sightingId, status);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener la lista de coincidencias',
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de una coincidencia por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la coincidencia' })
  @ApiResponse({ status: 404, description: 'Coincidencia no encontrada' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.matchesService.findOne(id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Coincidencia no encontrada',
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar información de una coincidencia' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Coincidencia actualizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Coincidencia no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateMatchDto: UpdateMatchDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.matchesService.update(id, updateMatchDto, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error.message === 'No autorizado') {
        return res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'No tienes permiso para actualizar esta coincidencia',
        });
      }
      if (error.message === 'Coincidencia no encontrada') {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Coincidencia no encontrada',
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una coincidencia' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Coincidencia eliminada exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Coincidencia no encontrada' })
  async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.matchesService.remove(id, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error.message === 'No autorizado') {
        return res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'No tienes permiso para eliminar esta coincidencia',
        });
      }
      if (error.message === 'Coincidencia no encontrada') {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Coincidencia no encontrada',
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al eliminar la coincidencia',
      });
    }
  }

  @Post('calculate')
  @ApiOperation({ summary: 'Calcular nuevas coincidencias' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Coincidencias calculadas exitosamente' })
  async calculateMatches(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.matchesService.calculateMatches(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al calcular coincidencias',
      });
    }
  }

  @Get('dog/:dogId')
  @ApiOperation({ summary: 'Obtener coincidencias de un perro específico' })
  @ApiResponse({ status: 200, description: 'Lista de coincidencias del perro' })
  async findByDog(@Param('dogId') dogId: string, @Res() res: Response) {
    try {
      const result = await this.matchesService.findByDog(dogId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener las coincidencias del perro',
      });
    }
  }

  @Get('sighting/:sightingId')
  @ApiOperation({ summary: 'Obtener coincidencias de un avistamiento específico' })
  @ApiResponse({ status: 200, description: 'Lista de coincidencias del avistamiento' })
  async findBySighting(@Param('sightingId') sightingId: string, @Res() res: Response) {
    try {
      const result = await this.matchesService.findBySighting(sightingId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener las coincidencias del avistamiento',
      });
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener coincidencias de un usuario específico' })
  @ApiResponse({ status: 200, description: 'Lista de coincidencias del usuario' })
  async findByUser(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const result = await this.matchesService.findByUser(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener las coincidencias del usuario',
      });
    }
  }
}