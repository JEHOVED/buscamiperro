export default () => ({
  port: parseInt(process.env.PORT, 10) || 3010,
  elasticsearch: {
    host: process.env.ELASTICSEARCH_HOST || 'localhost:9200',
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});