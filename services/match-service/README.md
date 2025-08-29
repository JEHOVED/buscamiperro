# Match Service

Servicio de coincidencias para la aplicación BuscaMiPerro.

## Descripción

Este microservicio maneja toda la funcionalidad relacionada con las coincidencias entre perros perdidos y avistamientos, incluyendo:
- Creación de coincidencias manuales
- Cálculo automático de coincidencias
- Actualización de información de coincidencias
- Eliminación de registros
- Búsqueda y filtrado de coincidencias

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

- `POST /matches` - Crear una nueva coincidencia
- `GET /matches` - Obtener lista de coincidencias
- `GET /matches/:id` - Obtener detalles de una coincidencia por ID
- `PUT /matches/:id` - Actualizar información de una coincidencia
- `DELETE /matches/:id` - Eliminar una coincidencia
- `POST /matches/calculate` - Calcular nuevas coincidencias
- `GET /matches/dog/:dogId` - Obtener coincidencias de un perro específico
- `GET /matches/sighting/:sightingId` - Obtener coincidencias de un avistamiento específico
- `GET /matches/user/:userId` - Obtener coincidencias de un usuario específico

## Documentación

La documentación de la API está disponible en `/api` cuando el servicio está en ejecución.