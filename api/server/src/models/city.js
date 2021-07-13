const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.hasMany(models.Place, {
        foreignKey: "city_id",
        as: "places",
      });
    }
  }
  City.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      img: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "City",
      freezeTableName: true,
    }
  );
  return City;
};
