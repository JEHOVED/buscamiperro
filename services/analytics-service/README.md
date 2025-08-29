# Analytics Service

Servicio de analítica y métricas para la aplicación BuscaMiPerro.

## Descripción

Este microservicio maneja toda la funcionalidad relacionada con la analítica y métricas, incluyendo:
- Registro de eventos de usuario
- Dashboard de analítica en tiempo real
- Métricas de engagement y retención
- Tendencias de uso de la plataforma
- Reportes analíticos personalizados

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

- `POST /analytics/track` - Registrar un evento de analítica
- `GET /analytics/dashboard` - Obtener datos del dashboard de analítica
- `GET /analytics/metrics` - Obtener métricas específicas
- `GET /analytics/trends` - Obtener tendencias de uso
- `GET /analytics/reports` - Obtener reportes analíticos

## Documentación

La documentación de la API está disponible en `/api` cuando el servicio está en ejecución.