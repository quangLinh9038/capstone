const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AccommodationItinerary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccommodationItinerary.init(
    {
      itinerary_id: {
        type: DataTypes.INTEGER,
      },
      accommodation_id: {
        type: DataTypes.INTEGER,
      },
      position: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "AccommodationItinerary",
      freezeTableName: true,
    }
  );
  return AccommodationItinerary;
};
