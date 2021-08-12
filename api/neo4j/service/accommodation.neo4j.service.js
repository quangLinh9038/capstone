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
  initRelationship: async () => {
    const cypher = `CALL apoc.periodic.iterate(
        "MATCH (p:Place), (a:Accommodation)
        WHERE NOT (a)-[:DISTANCE_TO]->(p)
        WITH point({longitude:p.lng, latitude:p.lat}) as p1,
        point({longitude: a.lng, latitude: a.lat}) as p2, p, a
        WITH distance(p1, p2) as distance, p, a
        RETURN p, a, distance",
        "CREATE (a)-[:DISTANCE_TO {dist: distance}]->(p) RETURN p, a",
        {batchSize: 1000, parallel: true})`;
    const result = await neode.cypher(cypher);

    return result
      ? console.log(`Init relationship success for Accommodation`)
      : console.log("Init relationship for Accommodation failure");
  },
};

module.exports = AccommodationNeo4jService;
