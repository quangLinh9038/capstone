const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CuisineTrip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  CuisineTrip.init(
    {
      cuisine_id: DataTypes.INTEGER,
      trip_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CuisineTrip",
      freezeTableName: true,
    }
  );
  return CuisineTrip;
};
