/**
 * Define neode methods for Place label
 */

// include defined Neode instance
const neode = require("../index");

const PlaceNeo4jService = {
  getAll: async () => {
    await neode.all("Place");
  },

  createPlace: async (properties) => {
    // CREAT (p:Place)
    await neode.create("Place", properties);
  },
};

module.exports = PlaceNeo4jService;
