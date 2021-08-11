const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Interest, {
        through: "UserInterest",
        foreignKey: 'user_id',
        as: 'interests',
      });
      User.hasMany(models.Trip, {
        foreignKey: 'user_id',
        as: 'trips',
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
    }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
  });
  return User;
};
