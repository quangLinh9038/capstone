/**
 * Define neode methods for Place label
 */

// include defined Neode instance
const neode = require("../index");

const AccommodationNeo4jService = {
  getAll: async () => {
    await neode.all("Accommodation");
  },

  createAccomodation: async (properties) => {
    // CREAT (p:Place)
    await neode.create("Accommodation", properties);
  },
};

module.exports = AccommodationNeo4jService;