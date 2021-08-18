const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlaceItinerary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  PlaceItinerary.init(
    {
      itinerary_id: {
        type: DataTypes.INTEGER,
      },
      place_id: {
        type: DataTypes.INTEGER,
      },
      position: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "PlaceItinerary",
      freezeTableName: true,
    }
  );
  return PlaceItinerary;
};
