const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    // static associate(models) {
    //   // define association here
    // }
  }

  Place.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
      },
      img1: {
        type: DataTypes.STRING,
      },
      img2: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: 'Place',
    },
  );
  return Place;
};
