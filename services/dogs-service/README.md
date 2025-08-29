# Dogs Service

Servicio de gestión de perros para la aplicación BuscaMiPerro.

## Descripción

Este microservicio maneja toda la funcionalidad relacionada con los perros perdidos, incluyendo:
- Registro de perros perdidos
- Búsqueda y filtrado de perros
- Actualización de información
- Eliminación de registros
- Geolocalización de perros perdidos

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

- `POST /dogs` - Registrar un nuevo perro perdido
- `GET /dogs` - Obtener lista de perros perdidos
- `GET /dogs/:id` - Obtener detalles de un perro por ID
- `PUT /dogs/:id` - Actualizar información de un perro
- `DELETE /dogs/:id` - Eliminar un perro
- `GET /dogs/user/:userId` - Obtener perros de un usuario específico
- `GET /dogs/search` - Buscar perros por criterios

## Documentación

La documentación de la API está disponible en `/api` cuando el servicio está en ejecución.