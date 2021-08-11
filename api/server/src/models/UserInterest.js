const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserInterest extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }
    UserInterest.init(
      {
        user_id: DataTypes.INTEGER,
        interest_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "UserInterest",
      }
    );
    return UserInterest;
  };