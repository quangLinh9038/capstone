const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    static associate(models) {
      Cuisine.belongsTo(models.City, {
        foreignKey: "city_id",
        as: "city",
      });
      Cuisine.belongsToMany(models.Itinerary, {
        through: "CuisineItinerary",
        foreignKey: "cuisine_id",
        as: "itineraries",
      });
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
      img: {
        type: DataTypes.TEXT,
      },
      category: {
        type: DataTypes.STRING,
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
      isIndian: {
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
