require("dotenv").config();

const { log } = require("console");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

/***
 * Configuration environment
 */
let sequelize;
if (config.use_env_variable) {
  // when in production
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // when in development
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

/**
 * Importing and reading models
 * fs.readdirSync read __dirname as models/index.js
 * Models are defined in models/ directory being pulled in from
 */
fs.readdirSync(__dirname)

  /**
   * Filter function to make sure
   * - there are files to read in models/
   * - except index.js (this file)
   * - models end with '.js'
   */
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )

  /**
   * Each model file keyed into exports Object
   * */
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

/**
 * Associating each model after obtaining all model files
 * running through models' association if exists
 */
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
