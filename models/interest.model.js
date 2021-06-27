// const { DataTypes } = require('sequelize');

// const db = require('.');

// const Interest = db.sequelize.define('Interest', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // Interest.hasMany(Place);
// // Place.belongsTo(Interest);

// module.exports = Interest;

module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interests', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Interest;
};
