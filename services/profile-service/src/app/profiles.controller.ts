import { Controller, Get, Put, Delete, Body, Param, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  @ApiOperation({ summary: 'Obtener el perfil del usuario actual' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Perfil del usuario' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  async getMyProfile(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub; // Obtener ID del usuario del token JWT
      const result = await this.profilesService.findOneByUserId(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Perfil no encontrado',
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener perfil por ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Detalles del perfil' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.profilesService.findOne(id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Perfil no encontrado',
      });
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener perfil por ID de usuario' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Detalles del perfil' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  async findByUserId(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const result = await this.profilesService.findOneByUserId(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Perfil no encontrado',
      });
    }
  }

  @Put('me')
  @ApiOperation({ summary: 'Actualizar el perfil del usuario actual' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Perfil actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async updateMyProfile(@Body() updateProfileDto: UpdateProfileDto, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub; // Obtener ID del usuario del token JWT
      const result = await this.profilesService.updateByUserId(userId, updateProfileDto);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar perfil por ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Perfil actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.profilesService.update(id, updateProfileDto, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error.message === 'No autorizado') {
        return res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'No tienes permiso para actualizar este perfil',
        });
      }
      if (error.message === 'Perfil no encontrado') {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Perfil no encontrado',
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar perfil' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Perfil eliminado exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.profilesService.remove(id, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error.message === 'No autorizado') {
        return res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'No tienes permiso para eliminar este perfil',
        });
      }
      if (error.message === 'Perfil no encontrado') {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Perfil no encontrado',
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al eliminar el perfil',
      });
    }
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar perfiles por criterios' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Resultados de búsqueda' })
  async search(@Req() req: Request, @Res() res: Response) {
    try {
      const query = req.query;
      const result = await this.profilesService.search(query);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error en la búsqueda',
      });
    }
  }
}