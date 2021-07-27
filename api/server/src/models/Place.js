const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      Place.belongsTo(models.City, {
        foreignKey: "city_id",
        as: "city",
      });
      Place.belongsToMany(models.Trip, {
        through: "PlaceTrip",
        foreignKey: "place_id",
        as: "trips",
      });
    }
  }

  Place.init(
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
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
      img: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      isHistorical: {
        type: DataTypes.INTEGER,
      },
      isUrban: {
        type: DataTypes.INTEGER,
      },
      isReligious: {
        type: DataTypes.INTEGER,
      },
      isMuseum: {
        type: DataTypes.INTEGER,
      },
      isShopping: {
        type: DataTypes.INTEGER,
      },
      isAdventure: {
        type: DataTypes.INTEGER,
      },
      isNature: {
        type: DataTypes.INTEGER,
      },
      isPark: {
        type: DataTypes.INTEGER,
      },
      lat: {
        type: DataTypes.FLOAT,
      },
      lng: {
        type: DataTypes.FLOAT,
      },
      unique_point: {
        type: DataTypes.STRING,

        // get: function () {
        //   const value = this.getDataValue("lat") + this.getDataValue("lng");
        //   return value;
        // },
        // set: function () {
        //   const value = this.getDataValue("lat") + this.getDataValue("lng");
        //   this.setDataValue("unique_point", value);
        // },
      },
      city_id: DataTypes.INTEGER,
    },
    {
      // hooks: {
      //   beforeBulkCreate: (Place) => {
      //     Place.unique_point = Place.lat + Place.lng;
      //   },
      // },

      // define point schema here
      sequelize,
      modelName: "Place",
      freezeTableName: true,
    }
  );
  return Place;
};
