/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

// configuration environment
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config); // when in production
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config); // when in development
}

/**
 * importing and reading models
 * fs.readdirSync read __dirname as models/index.js
 * models are defined in models/ directory being pulled in from
*/
fs
  .readdirSync(__dirname)

  /**
   * filter function to make sure
   * - there are files to read in models/
   * - except index.js (this file)
   * - models end with '.js'
   */
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  // each model file keyed into exports Object
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// associating each model after obtaining all model files
// running through models' association if exists
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
