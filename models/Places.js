// const { DataTypes } = require('sequelize');
// const Interest = require('./interest.model');
// const db = require('.');

module.exports = (sequelize, DataTypes) => {
  const Places = sequelize.define('places', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
    },
    img1: {
      type: DataTypes.STRING,
    },
    img2: {
      type: DataTypes.STRING,
    },
    isHistorical: {
      type: DataTypes.INTEGER,
    },
    isUrban: {
      type: DataTypes.INTEGER,
    },
    isReligious: {
      type: DataTypes.INTEGER,
    },
    isMuseum: {
      type: DataTypes.INTEGER,
    },
    isShopping: {
      type: DataTypes.INTEGER,
    },
    isAdventure: {
      type: DataTypes.INTEGER,
    },
    isNature: {
      type: DataTypes.INTEGER,
    },
    isPark: {
      type: DataTypes.INTEGER,
    },
    interestedId: {
      type: DataTypes.INTEGER,
    },
  });
  return Places;
};

// console.log(Place === db.sequelize.models.Place);

// module.exports = Place;
