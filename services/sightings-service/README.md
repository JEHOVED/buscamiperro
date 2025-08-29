# Sightings Service

Servicio de reporte de avistamientos para la aplicación BuscaMiPerro.

## Descripción

Este microservicio maneja toda la funcionalidad relacionada con los avistamientos de perros perdidos, incluyendo:
- Registro de avistamientos
- Búsqueda y filtrado de avistamientos
- Actualización de información
- Eliminación de registros
- Geolocalización de avistamientos
- Búsqueda de avistamientos cercanos

## Tecnologías

- NestJS
- TypeScript
- PostgreSQL con TypeORM
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

- `POST /sightings` - Registrar un nuevo avistamiento
- `GET /sightings` - Obtener lista de avistamientos
- `GET /sightings/:id` - Obtener detalles de un avistamiento por ID
- `PUT /sightings/:id` - Actualizar información de un avistamiento
- `DELETE /sightings/:id` - Eliminar un avistamiento
- `GET /sightings/dog/:dogId` - Obtener avistamientos de un perro específico
- `GET /sightings/user/:userId` - Obtener avistamientos de un usuario específico
- `GET /sightings/nearby` - Buscar avistamientos cercanos

## Documentación

La documentación de la API está disponible en `/api` cuando el servicio está en ejecución.