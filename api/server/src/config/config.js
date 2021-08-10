require("dotenv").config();

const {
  PG_NAME,
  PG_CLOUDNAME,
  PG_LOCALHOST,
  PG_CLOUDHOST,
  PG_USERNAME,
  PG_CLOUDUSER,
  PG_PASSWORD,
  PG_CLOUDPWD,
  PG_PORT,
} = process.env;

module.exports = {
  development: {
    port: PG_PORT,
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_NAME,
    host: PG_LOCALHOST,
    dialect: "postgres",
    logging: false,
    ssl: false,
  },

  test: {
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: "database_test",
    host: PG_LOCALHOST,
    dialect: "postgres",
  },

  /* 
  Cloud Database when in production
  */
  production: {
    username: PG_CLOUDUSER,
    password: PG_CLOUDPWD,
    database: PG_CLOUDNAME,
    host: PG_CLOUDHOST,
    dialect: "postgres",
    logging: false,
    ssl: true,
  },
};
