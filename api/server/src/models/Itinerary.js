const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Itinerary extends Model {
    static associate(models) {
      Itinerary.belongsTo(models.Trip, {
        foreignKey: "trip_id",
        as: "trip",
      });
    }
  }
  Itinerary.init(
    {
      title: DataTypes.STRING,
      numberOfItems: DataTypes.INTEGER,
      itemListElement: DataTypes.ARRAY(DataTypes.INTEGER),
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
