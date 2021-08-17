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
  deleteOneAccommodationNode: async (unique_point) => {
    const cypher = `MATCH (a:Accommodation {unique_point: '${unique_point}'}) DETACH DELETE a`;
    return await neode.cypher(cypher);
  },
  deleteAllAccommodations: async () => {
    // DELETE (a:Accommodation) DETACH DELETE a;
    await neode.deleteAll("Accommodation");
  },
  updateAccommodation: async (unique_point, updateAccommodation) => {
    const accommodationToUpdate = await neode.first(
      "Accommodation",
      "unique_point",
      `${unique_point}`
    );
    return await accommodationToUpdate.update(updateAccommodation);
  },

  // init relationship between Place and Accommodation to create distance
  initRelationshipToCuisine: async () => {
    const cypher = `CALL apoc.periodic.iterate(
        "MATCH (a:Accommodation), (c:Cuisine)
        WHERE NOT (a)-[:DISTANCE_TO]->(c)
        WITH point({longitude:a.lng, latitude:a.lat}) as p1,
        point({longitude: c.lng, latitude: c.lat}) as p2, a, c
        WITH distance(p1, p2) as distance, a, c
        RETURN a, c, distance",
        "CREATE (a)-[:DISTANCE_TO {dist: distance}]->(c) RETURN a, c",
        {batchSize: 1000, parallel: true})`;
    const result = await neode.cypher(cypher);

    return result
      ? console.log(`Init relationship success Accommodation to Cuisine`)
      : console.log("Init relationship failure Accommodation to Cuisine");
  },
};

module.exports = AccommodationNeo4jService;
