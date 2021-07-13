// require("dotenv").config();

// const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

// PORT=3001
// DB_NAME=trips
// DB_HOST='127.0.0.1'
// DB_USERNAME=postgres
// DB_PASSWORD=3007

module.exports = {
  development: {
    username: "postgres",
    password: "Dinhthienly1",
    database: "trips",
    host: "127.0.0.1",
    dialect: "postgres",
  },

  // test: {
  //   username: DB_USERNAME,
  //   password: DB_PASSWORD,
  //   database: "database_test",
  //   host: DB_HOST,
  //   dialect: "postgres",
  // },

  // production: {
  //   username: DB_USERNAME,
  //   password: DB_PASSWORD,
  //   database: "database_production",
  //   host: DB_HOST,
  //   dialect: "postgres",
  // },
};
