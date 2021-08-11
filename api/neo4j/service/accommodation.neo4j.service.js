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

  initRelationship: async () => {
    const cypher = `CALL apoc.periodic.iterate(
      "MATCH (p:Place), (a:Accommodation)
      WHERE NOT (a)-[:DISTANCE_TO]-(p) WITH point({longitude:a.lng, latitude:a.lat}) as p1,
      point({longitude: p.lng, latitude: p.lat}) as p2, p, a WITH distance(p1, p2) as distance, a, p
      RETURN a, p, distance",
      "CREATE (a)-[:DISTANCE_TO {dist: distance}]-> (p) RETURN a, p",
      {batchSize: 1000, parallel: true})`;
    return await neode
      .cypher(cypher)
      .then(console.log(`Init relationship success`));
  },
};

module.exports = AccommodationNeo4jService;
