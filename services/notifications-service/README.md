# Notifications Service

Servicio de notificaciones para la aplicación BuscaMiPerro.

## Descripción

Este microservicio maneja toda la funcionalidad de notificaciones para los usuarios, incluyendo:
- Notificaciones en la aplicación
- Notificaciones push para web y móviles
- Gestión de suscripciones a notificaciones
- Categorización de notificaciones por tipo
- Marcar notificaciones como leídas

## Tecnologías

- NestJS
- TypeScript
- PostgreSQL con TypeORM
- Web Push API
- Firebase Cloud Messaging
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

- `POST /notifications` - Crear una nueva notificación
- `GET /notifications` - Obtener lista de notificaciones del usuario
- `GET /notifications/:id` - Obtener detalles de una notificación por ID
- `PUT /notifications/:id` - Actualizar información de una notificación
- `DELETE /notifications/:id` - Eliminar una notificación
- `POST /notifications/send` - Enviar una notificación push
- `POST /notifications/subscribe` - Suscribir dispositivo para notificaciones push
- `POST /notifications/unsubscribe` - Cancelar suscripción de dispositivo para notificaciones push
- `PUT /notifications/mark-as-read/:id` - Marcar notificación como leída
- `PUT /notifications/mark-all-as-read` - Marcar todas las notificaciones como leídas

## Documentación

La documentación de la API está disponible en `/api` cuando el servicio está en ejecución.