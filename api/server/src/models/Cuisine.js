'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cuisine.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    img: DataTypes.TEXT,
    district: DataTypes.STRING,
    location: DataTypes.STRING,
    score: DataTypes.FLOAT,
    price: DataTypes.STRING,
    features: DataTypes.STRING,
    is3Stars: DataTypes.NUMBER,
    is4Stars: DataTypes.NUMBER,
    is5Stars: DataTypes.NUMBER,
    isHomestay: DataTypes.NUMBER,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};