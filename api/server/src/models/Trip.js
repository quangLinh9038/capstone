const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    static associate(models) {
      Trip.hasMany(models.Place, {
        foreignKey: "trip_id",
        as: "places",
      });
      Trip.hasMany(models.Accommodation, {
        foreignKey: "trip_id",
        as: "accommodation",
      });
    }
  }

  Trip.init(
    {
      id: {
        type: DataTypes.UUID,
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

      // hasMany Places
      // hasMany Accomms
      // hasMany Restaurants
    },
    {
      sequelize,
      modelName: "Trip",
      freezeTableName: true,
    }
  );
  return Trip;
};
