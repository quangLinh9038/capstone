const config = require('../config/config')
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize (config.development.database,config.development.username, config.development.password, 
  {
  host: config.development.host,
  dialect: config.development.dialect,
  operatorAliases: false,
  });

class Place extends Model {}

Place.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING
  },
  img1: {
    type: DataTypes.STRING
  },
  img2: {
    type: DataTypes.STRING
  },
  isHistorical: {
    type: DataTypes.INTEGER
  },
  isUrban: {
    type: DataTypes.INTEGER
  },
  isReligious: {
    type: DataTypes.INTEGER
  },
  isMuseum: {
    type: DataTypes.INTEGER
  },
  isShopping: {
    type: DataTypes.INTEGER
  },
  isAdventure: {
    type: DataTypes.INTEGER
  },
  isNature: {
    type: DataTypes.INTEGER
  },
  isPark: {
    type: DataTypes.INTEGER
  },
}, {
  // Other model options go here
  sequelize,
  modelName: 'Places' // We need to choose the model name
});

// the defined model is the class itself
console.log(Place === sequelize.models.Place); // true

module.exports = Place;