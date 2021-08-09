const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    static associate(models) {
      Interest.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Interest.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Interest",
      freezeTableName: true,
    }
  );
  return Interest;
};
