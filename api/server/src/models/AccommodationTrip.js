const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AccommodationTrip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccommodationTrip.init(
    {
      trip_id: DataTypes.INTEGER,
      accommodation_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AccommodationTrip",
      freezeTableName: true,
    }
  );
  return AccommodationTrip;
};
