# Chat Service

Servicio de chat en tiempo real para la aplicación BuscaMiPerro.

## Descripción

Este microservicio maneja toda la funcionalidad de chat en tiempo real entre usuarios, incluyendo:
- Mensajería en tiempo real con WebSockets
- Creación y gestión de conversaciones
- Envío y recepción de mensajes
- Notificaciones de mensajes no leídos
- Indicadores de escritura (typing indicators)

## Tecnologías

- NestJS
- TypeScript
- PostgreSQL con TypeORM
- Socket.IO para WebSockets
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

### REST API
- `POST /messages` - Enviar un nuevo mensaje
- `GET /messages/conversation/:conversationId` - Obtener mensajes de una conversación
- `GET /messages/unread` - Obtener mensajes no leídos del usuario
- `POST /messages/conversations` - Crear una nueva conversación
- `GET /messages/conversations` - Obtener conversaciones del usuario
- `GET /messages/conversations/:conversationId` - Obtener detalles de una conversación

### WebSocket Events
- `joinConversation` - Unirse a una conversación
- `leaveConversation` - Salir de una conversación
- `sendMessage` - Enviar un mensaje
- `typing` - Indicar que el usuario está escribiendo
- `markAsRead` - Marcar mensajes como leídos

## Documentación

La documentación de la API está disponible en `/api` cuando el servicio está en ejecución.