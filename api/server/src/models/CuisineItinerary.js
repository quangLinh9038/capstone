const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CuisineItinerary extends Model {
    static associate(models) {}
  }
  CuisineItinerary.init(
    {
      itinerary_id: {
        type: DataTypes.INTEGER,
      },
      cuisine_id: {
        type: DataTypes.INTEGER,
      },
      position: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "CuisineItinerary",
      freezeTableName: true,
    }
  );
  return CuisineItinerary;
};
