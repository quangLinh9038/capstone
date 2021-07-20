"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlaceTrip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaceTrip.init(
    {
      place_id: DataTypes.INTEGER,
      trip_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PlaceTrip",
    }
  );
  return PlaceTrip;
};
