const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      Place.belongsTo(models.City, {
        foreignKey: "city_id",
        as: "city",
      });
      Place.belongsToMany(models.Itinerary, {
        through: "PlaceItinerary",
        foreignKey: "place_id",
        as: "itineraries",
      });
    }
  }

  Place.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },

      price: {
        type: DataTypes.FLOAT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      img: {
        type: DataTypes.TEXT,
      },
      img1: {
        type: DataTypes.TEXT,
      },
      img2: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
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
      city_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Place",
      freezeTableName: true,
    }
  );
  return Place;
};
