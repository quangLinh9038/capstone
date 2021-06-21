const config = require("../config/config");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    operatorAliases: false,
    // logging: false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
