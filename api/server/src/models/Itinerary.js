const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Itinerary extends Model {
    static associate(models) {
      Itinerary.belongsToMany(models.Place, {
        through: "PlaceItinerary",
        foreignKey: "itinerary_id",
        as: "places",
      });
      Itinerary.belongsToMany(models.Accommodation, {
        through: "AccommodationItinerary",
        foreignKey: "itinerary_id",
        as: "accommodations",
      });
      Itinerary.belongsToMany(models.Cuisine, {
        through: "CuisineItinerary",
        foreignKey: "itinerary_id",
        as: "cuisines",
      });
      Itinerary.belongsTo(models.Trip, {
        foreignKey: "trip_id",
        as: "trip",
      });
    }
  }
  Itinerary.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      numberOfItems: {
        type: DataTypes.INTEGER,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
      },
      trip_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Itinerary",
      freezeTableName: true,
    }
  );
  return Itinerary;
};
