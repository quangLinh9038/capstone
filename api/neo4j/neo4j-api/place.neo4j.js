/**
 * Define neode methods for Place label
 */

// include defined Neode instance
const neode = require("../index");

const PlaceNeo4jService = {
  getAll: async () => {
    // MATCH (p:Place) RETURN p;
    await neode.all("Place");
  },

  createPlace: async (properties) => {
    // CREAT (p:Place {properties}) RETURN p;
    await neode.create("Place", properties);
  },

  deletePlaces: async (label) => {
    // DELETE (p:Place) DETACH DELETE p;
    await neode
      .deleteAll("Place")
      .then(() => console.log("Delete all Place nodes!!!"));
  },
};

module.exports = PlaceNeo4jService;
