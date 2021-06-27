// const { DataTypes } = require('sequelize');
// const db = require('.');
module.exports = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodations', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
    },
    img: {
      type: DataTypes.TEXT,
    },
    district: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
    },
    features: {
      type: DataTypes.STRING,
    },
    is3Stars: {
      type: DataTypes.INTEGER,
    },
    is4Stars: {
      type: DataTypes.INTEGER,
    },
    is5Stars: {
      type: DataTypes.INTEGER,
    },
    isHomestay: {
      type: DataTypes.INTEGER,
    },
  });
  return Accommodation;
};

// module.exports = Accommodation;
