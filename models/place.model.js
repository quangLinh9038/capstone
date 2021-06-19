const db = require("../models");
const { DataTypes } = require("sequelize");

const Place = db.sequelize.define("Places", {
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
});

module.exports = Place;

// class Place extends Model {

// }

// Place.init(
//   {
//     // Model attributes are defined here
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     url: {
//       type: DataTypes.STRING,
//     },
//     img1: {
//       type: DataTypes.STRING,
//     },
//     img2: {
//       type: DataTypes.STRING,
//     },
//     isHistorical: {
//       type: DataTypes.INTEGER,
//     },
//     isUrban: {
//       type: DataTypes.INTEGER,
//     },
//     isReligious: {
//       type: DataTypes.INTEGER,
//     },
//     isMuseum: {
//       type: DataTypes.INTEGER,
//     },
//     isShopping: {
//       type: DataTypes.INTEGER,
//     },
//     isAdventure: {
//       type: DataTypes.INTEGER,
//     },
//     isNature: {
//       type: DataTypes.INTEGER,
//     },
//     isPark: {
//       type: DataTypes.INTEGER,
//     },
//   },
//   {
//     // Other model options go here
//     sequelize,
//     modelName: "Places", // We need to choose the model name
//   }
// );

// // the defined model is the class itself
// console.log(Place === sequelize.models.Place); // true

// return Place;
