# Profile Service

Servicio de gestión de perfiles para la aplicación BuscaMiPerro.

## Descripción

Este microservicio maneja toda la funcionalidad relacionada con los perfiles de usuario, incluyendo:
- Gestión de perfiles de usuario
- Actualización de información personal
- Búsqueda de perfiles públicos
- Configuración de preferencias de notificación
- Control de privacidad

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

- `GET /profiles/me` - Obtener el perfil del usuario actual
- `GET /profiles/:id` - Obtener perfil por ID
- `GET /profiles/user/:userId` - Obtener perfil por ID de usuario
- `PUT /profiles/me` - Actualizar el perfil del usuario actual
- `PUT /profiles/:id` - Actualizar perfil por ID
- `DELETE /profiles/:id` - Eliminar perfil
- `GET /profiles/search` - Buscar perfiles por criterios

## Documentación

La documentación de la API está disponible en `/api` cuando el servicio está en ejecución.