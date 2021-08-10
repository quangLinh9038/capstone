const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    static associate(models) {
      Interest.belongsToMany(models.User, {
        through: "UserInterest",
        foreignKey: "interest_id",
        as: "users",
      });
    }
  }
  Interest.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Interest",
      freezeTableName: true,
    }
  );
  return Interest;
};
