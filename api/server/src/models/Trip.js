const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    static associate(models) {
      Trip.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Trip.hasMany(models.Itinerary, {
        foreignKey: "trip_id",
        as: "itineraries",
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
