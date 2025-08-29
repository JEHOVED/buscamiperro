# Auth Service

Servicio de autenticación para la aplicación BuscaMiPerro.

## Descripción

Este microservicio maneja toda la funcionalidad de autenticación y autorización de usuarios, incluyendo:
- Registro e inicio de sesión tradicional
- Autenticación con Google y Facebook
- Generación y validación de JWT tokens
- Gestión de refresh tokens
- Verificación de email
- Recuperación de contraseña

## Tecnologías

- NestJS
- TypeScript
- PostgreSQL con TypeORM
- Passport.js para autenticación
- JWT para tokens
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

- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión
- `POST /auth/refresh` - Refrescar token
- `GET /auth/google` - Autenticación con Google
- `GET /auth/facebook` - Autenticación con Facebook
- `GET /auth/profile` - Obtener perfil del usuario
- `POST /auth/logout` - Cerrar sesión

## Documentación

La documentación de la API está disponible en `/api` cuando el servicio está en ejecución.