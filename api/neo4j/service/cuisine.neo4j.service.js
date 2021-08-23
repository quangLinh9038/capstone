/* Define neode instance */
const neode = require("../index");

const Cuisine = "Cuisine";
const CuisineNeo4jService = {
  getAllCuisine: async () => {
    // MATCH (p:Place) RETURN p;
    return await neode.all(Cuisine);
  },

  createCuisine: async (properties) => {
    // CREAT (p:Place {properties}) RETURN p;
    return await neode.create(Cuisine, properties);
  },
  deleteOneCuisineNode: async (unique_point) => {
    const cypher = `MATCH (c:Cuisine {unique_point: '${unique_point}'}) DETACH DELETE c`;
    return await neode.writeCypher(cypher);
  },
  deleteAllCuisines: async () => {
    // DELETE (p:Place) DETACH DELETE p;
    return await neode.deleteAll(Cuisine);
  },

  updateCuisine: async (unique_point, updateCuisine) => {
    const cuisineToUpdate = await neode.first(
      Cuisine,
      "unique_point",
      `${unique_point}`
    );

    return await cuisineToUpdate.update(updateCuisine);
  },
};

module.exports = CuisineNeo4jService;
