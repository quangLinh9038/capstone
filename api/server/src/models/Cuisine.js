const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    static associate(models) {
      Cuisine.belongsTo(models.City, {
        foreignKey: "city_id",
        as: "city",
      });
      Cuisine.belongsToMany(models.Trip, {
        through: "CuisineTrip",
        foreignKey: "place_id",
        as: "trips",
      });
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
      city_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
      freezeTableName: true,
    }
  );
  return Cuisine;
};
