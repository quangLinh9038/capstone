"use strict";
const { Model } = require("sequelize");
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
  }
  Cuisine.init(
    {
      tile: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
      img: {
        type: DataTypes.TEXT,
      },
      isVietnamese: {
        type: DataTypes.INTEGER,
      },
      isWestern: {
        type: DataTypes.INTEGER,
      },
      isJapanese: {
        type: DataTypes.INTEGER,
      },
      isThai: {
        type: DataTypes.INTEGER,
      },
      isChinese: {
        type: DataTypes.INTEGER,
      },
      idIndian: {
        type: DataTypes.INTEGER,
      },
      isKorean: {
        type: DataTypes.INTEGER,
      },
      lat: {
        type: DataTypes.FLOAT,
      },
      lng: {
        type: DataTypes.FLOAT,
      },
      unique_point: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );
  return Cuisine;
};
