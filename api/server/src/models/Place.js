const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      Place.belongsTo(models.City, {
        foreignKey: "city_id",
        as: "city",
      });
      Place.belongsToMany(models.Trip, {
        through: "PlaceTrip",
        foreignKey: "place_id",
        as: "trips",
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
      description: {
        type: DataTypes.TEXT,
      },
      img: {
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
      lat: {
        type: DataTypes.FLOAT,
      },
      lng: {
        type: DataTypes.FLOAT,
      },
      unique_point: {
        type: DataTypes.FLOAT,
      },
      city_id: DataTypes.INTEGER,
    },
    {
      /**
       * hook used to generate unique_point attributes
       * by sum of lat and lng
       */
      hooks: {
        beforeCreate: (place, options) => {
          place.unique_point = place.lat + place.lng;
        },
      },

      sequelize,
      modelName: "Place",
      freezeTableName: true,
    }
  );
  return Place;
};
