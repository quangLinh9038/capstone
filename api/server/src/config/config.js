require('custom-env').env('dev');

const {
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_NAME,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

module.exports = {
  development: {
    port: POSTGRES_PORT,
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_NAME,
    host: POSTGRES_HOST,
    dialect: 'postgres',
    logging: false,
    ssl: false,
  },
  test: {
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: 'database_test',
    host: POSTGRES_HOST,
    dialect: 'postgres',
  },
  production: {
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_NAME,
    host: POSTGRES_HOST,
    dialect: 'postgres',
    logging: false,
    ssl: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
