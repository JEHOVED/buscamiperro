# Reports Service

Servicio de generación de reportes para la aplicación BuscaMiPerro.

## Descripción

Este microservicio maneja toda la funcionalidad relacionada con la generación y gestión de reportes, incluyendo:
- Generación de reportes estadísticos
- Descarga de reportes en formato PDF
- Análisis de datos del sistema
- Estadísticas de uso y actividad
- Reportes personalizados por tipo

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

- `POST /reports` - Generar un nuevo reporte
- `GET /reports` - Obtener lista de reportes
- `GET /reports/:id` - Obtener detalles de un reporte por ID
- `GET /reports/:id/download` - Descargar un reporte por ID
- `GET /reports/statistics` - Obtener estadísticas del sistema
- `GET /reports/analytics` - Obtener análisis de datos

## Documentación

La documentación de la API está disponible en `/api` cuando el servicio está en ejecución.