const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Itinerary extends Model {
    static associate(models) {
      Itinerary.belongsToMany(models.Place, {
        through: "PlaceTrip",
        foreignKey: "trip_id",
        as: "places",
      });
      Itinerary.belongsToMany(models.Accommodation, {
        through: "AccommodationTrip",
        foreignKey: "trip_id",
        as: "accommodations",
      });
    }
  }
  Itinerary.init(
    {
      title: DataTypes.STRING,
      numberOfItems: DataTypes.NUMBER,
      itemListElement: DataTypes.ARRAY,
    },
    {
      sequelize,
      modelName: "Itinerary",
    }
  );
  return Itinerary;
};
