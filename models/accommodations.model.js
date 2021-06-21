const db = require("../models");
const { DataTypes, Model } = require("sequelize");

const Accommodation = db.sequelize.define("Accommodations", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
  },
  img: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.INTEGER,
  },
  score: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  features: {
    type: DataTypes.INTEGER,
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

module.exports = Accommodation; 


