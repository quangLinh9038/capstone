/**
 * Define neode methods for Place label
 */

// include defined Neode instance
const neode = require("../index");

const AccommodationNeo4jService = {
  getAll: async () => {
    await neode.all("Accommodation");
  },

  createAccommodation: async (properties) => {
    // Cypher:
    // CREATE (a:Accommodation {properties}) RETURN a
    await neode.create("Accommodation", properties);
  },

  deleteAllAccomms: async () => {
    // DELETE (a:Accommodation) DETACH DELETE a;
    await neode
      .deleteAll("Accommodation")
      .then(() => console.log("Delete all Accommodation nodes!!!"));
  },
};

module.exports = AccommodationNeo4jService;
