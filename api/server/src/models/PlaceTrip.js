const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlaceTrip extends Model {
    static associate(models) {}
  }
  PlaceTrip.init(
    {
      place_id: DataTypes.INTEGER,
      trip_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PlaceTrip",
      freezeTableName: true,
    }
  );
  return PlaceTrip;
};
