export default () => ({
  port: parseInt(process.env.PORT, 10) || 3009,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'buscamiperro_media',
  },
  storage: {
    path: process.env.STORAGE_PATH || './uploads',
    maxSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 50 * 1024 * 1024, // 50MB
  },
});