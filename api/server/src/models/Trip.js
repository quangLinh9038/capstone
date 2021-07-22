const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    static associate(models) {
      Trip.belongsToMany(models.Place, {
        through: "PlaceTrip",
        foreignKey: "trip_id",
        as: "places",
      });
      Trip.belongsToMany(models.Accommodation, {
        through: "AccommodationTrip",
        foreignKey: "trip_id",
        as: "accommodations",
      });
    }
  }

  Trip.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
      notes: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Trip",
      freezeTableName: true,
    }
  );
  return Trip;
};
