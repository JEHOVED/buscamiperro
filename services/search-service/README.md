# Search Service

Servicio de búsqueda avanzada para la aplicación BuscaMiPerro.

## Descripción

Este microservicio maneja toda la funcionalidad relacionada con la búsqueda avanzada, incluyendo:
- Búsqueda full-text en múltiples entidades
- Sugerencias de búsqueda
- Autocompletado inteligente
- Filtrado y facetas
- Indexación de datos
- Resultados relevantes con scoring

## Tecnologías

- NestJS
- TypeScript
- Elasticsearch
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

- `POST /search` - Realizar una búsqueda avanzada
- `GET /search` - Realizar una búsqueda rápida
- `GET /search/suggestions` - Obtener sugerencias de búsqueda
- `POST /search/index` - Indexar datos en el motor de búsqueda
- `GET /search/autocomplete` - Obtener autocompletado para búsqueda

## Documentación

La documentación de la API está disponible en `/api` cuando el servicio está en ejecución.