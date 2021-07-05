const db = require("../src/models");

const { Accommodation } = db;

const AccommodationService = {
  // get all accommodations
  getAllAccommodations: async () => {
    try {
      return await Accommodation.findAll();
    } catch (error) {
      return error;
    }
  },

  createAccommodations: async (newAccommodations) => {
    try {
      return await Accommodation.bulkCreate(newAccommodations);
    } catch (error) {
      return error;
    }
  },

  deleteAllAccommodations: async () => {
    try {
      return await Accommodation.destroy({ where: {} });
    } catch (error) {
      return error;
    }
  },
};

module.exports = AccommodationService;
