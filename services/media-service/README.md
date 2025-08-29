# Media Service

Servicio de gestión de multimedia para la aplicación BuscaMiPerro.

## Descripción

Este microservicio maneja toda la funcionalidad relacionada con la gestión de archivos multimedia, incluyendo:
- Subida y almacenamiento de archivos
- Generación de miniaturas para imágenes
- Descarga de archivos
- Gestión de permisos de acceso
- Validación de tipos y tamaños de archivos

## Tecnologías

- NestJS
- TypeScript
- PostgreSQL con TypeORM
- Multer para manejo de uploads
- Sharp para procesamiento de imágenes
- Docker

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` basado en `.env.example` y configura las variables de entorno necesarias.

## Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Docker

```bash
# Construir y ejecutar con Docker
docker-compose up --build
```

## Endpoints

- `POST /media/upload` - Subir un archivo multimedia
- `GET /media/:id` - Obtener información de un archivo por ID
- `GET /media/:id/download` - Descargar un archivo por ID
- `GET /media/:id/thumbnail` - Obtener miniatura de un archivo por ID
- `DELETE /media/:id` - Eliminar un archivo
- `GET /media/user/:userId` - Obtener archivos de un usuario específico

## Documentación

La documentación de la API está disponible en `/api` cuando el servicio está en ejecución.