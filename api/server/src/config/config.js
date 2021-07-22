require("dotenv").config();

const { PG_NAME, PG_HOST, PG_USERNAME, PG_PASSWORD, PG_PORT } = process.env;

module.exports = {
  development: {
    port: PG_PORT,
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_NAME,
    host: PG_HOST,
    dialect: "postgres",
    logging: true,
  },

  test: {
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: "database_test",
    host: PG_HOST,
    dialect: "postgres",
  },

  production: {
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: "database_production",
    host: PG_HOST,
    dialect: "postgres",
  },
};
