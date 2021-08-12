const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Itinerary extends Model {
    static associate(models) {}
  }
  Itinerary.init(
    {
      title: DataTypes.STRING,
      numberOfItems: DataTypes.INTEGER,
      itemListElement: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    {
      sequelize,
      modelName: "Itinerary",
      freezeTableName: true,
    }
  );
  return Itinerary;
};
