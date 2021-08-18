const db = require("../src/models");
const { City } = db;

const CityService = {
  createNewCity: async (newCity) => {
    try {
      return await City.bulkCreate(newCity);
    } catch (error) {
      return error;
    }
  },

  getOneCityByName: async (name) => {
    try {
      return await City.findOne({ name: name });
    } catch (error) {
      return error;
    }
  },
};

module.exports = CityService;
