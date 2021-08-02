require("dotenv").config();

const {
  PG_NAME,
  PG_HOST,
  PG_HOST2,
  PG_USERNAME,
  PG_PASSWORD,
  PG_PORT,
  PG_URL,
} = process.env;

module.exports = {
  // if using online database

  // development: {
  //   use_env_variable:
  //     "postgres://xhlvmaqh:Jg_Z9zllfuv0eHP87y2BvRWcx4ryINMc@kashin.db.elephantsql.com/xhlvmaqh",
  //   dialect: "postgres",
  //   dialectOptions: {
  //     ssl: true,
  //   },
  // },

  development: {
    port: PG_PORT,
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_NAME,
    host: PG_HOST2,
    dialect: "postgres",
    logging: false,
    ssl: true,
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
