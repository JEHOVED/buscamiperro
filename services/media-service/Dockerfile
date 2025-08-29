# Dockerfile para Media Service
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Crear directorio para uploads
RUN mkdir -p ./uploads

# Exponer puerto
EXPOSE 3009

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]