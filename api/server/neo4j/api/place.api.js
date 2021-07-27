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

  deletePlaces: async () => {
    // DELETE (p:Place) DETACH DELETE p;
    await neode
      .deleteAll("Place")
      .then(() => console.log("Delete all Place nodes!!!"));
  },

  // test case
  getMainPlaces: async (unique_point) => {
    // get landmark Place nodes
    // matched unique_point with postgres
    await neode
      .cypher(`MATCH (p:Place {unique_point: ${unique_point}}) RETURN p;`)
      .then(console.log("Place queried on Neo4j"));
  },

  // return list of distance
};

module.exports = PlaceNeo4jService;
