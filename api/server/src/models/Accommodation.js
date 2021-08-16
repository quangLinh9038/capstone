const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accommodation extends Model {
    static associate(models) {
      Accommodation.belongsTo(models.City, {
        foreignKey: "city_id",
        as: "city",
      });
      Accommodation.belongsToMany(models.Itinerary, {
        through: "AccommodationItinerary",
        foreignKey: "accommodation_id",
        as: "itineraries",
      });
    }
  }

  Accommodation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
      },
      img: {
        type: DataTypes.TEXT,
      },
      district: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      price: {
        type: DataTypes.STRING,
      },
      features: {
        type: DataTypes.STRING,
      },
      is3Stars: {
        type: DataTypes.INTEGER,
      },
      is4Stars: {
        type: DataTypes.INTEGER,
      },
      is5Stars: {
        type: DataTypes.INTEGER,
      },
      isHomestay: {
        type: DataTypes.INTEGER,
      },
      lat: {
        type: DataTypes.FLOAT,
      },
      lng: {
        type: DataTypes.FLOAT,
      },
      unique_point: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      city_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      modelName: "Accommodation",
      sequelize,
      freezeTableName: true,
    }
  );
  return Accommodation;
};
