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
};

module.exports = CityService;
