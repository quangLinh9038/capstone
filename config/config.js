require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_URL } = process.env;

module.exports = {

  // development: {
  //   use_env_variable: DB_URL,
  //   dialect: "postgres"

  // },

  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "database_development",
    host: DB_HOST,
    dialect: "postgres",
  },

  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "database_test",
    host: DB_HOST,
    dialect: "postgres"
  },

  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "database_production",
    host: DB_HOST,
    dialect: "postgres"
  }
}
