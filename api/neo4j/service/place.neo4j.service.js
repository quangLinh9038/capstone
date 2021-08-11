/**
 * Define neode instance
 */
const neode = require("../index");

const PlaceNeo4jService = {
  getAll: async () => {
    // MATCH (p:Place) RETURN p;
    return await neode.all("Place");
  },

  createPlace: async (properties) => {
    // CREAT (p:Place {properties}) RETURN p;
    return await neode.create("Place", properties);
  },
  deleteOneNode: async (unique_point) => {
    const cypher = `MATCH (p:Place {unique_point: '${unique_point}'}) DETACH DELETE p`;
    return await neode.cypher(cypher);
  },
  deletePlaces: async () => {
    // DELETE (p:Place) DETACH DELETE p;
    return await neode.deleteAll("Place");
  },

  updatePlace: async (unique_point, updatePlace) => {
    const placeToUpdate = await neode.first(
      "Place",
      "unique_point",
      `${unique_point}`
    );

    return await placeToUpdate.update(updatePlace);
  },

  // init relationship between Place and Accommodation to create distance
  initRelationship: async () => {
    const cypher = `CALL apoc.periodic.iterate(
      "MATCH (p:Place), (a:Accommodation)
      WHERE NOT (p)-[:DISTANCE_TO]->(a)
      WITH point({longitude:p.lng, latitude:p.lat}) as p1,
      point({longitude: a.lng, latitude: a.lat}) as p2, p, a
      WITH distance(p1, p2) as distance, p, a
      RETURN p, a, distance",
      "CREATE (p)-[:DISTANCE_TO {dist: distance}]->(a) RETURN p, a",
      {batchSize: 1000, parallel: true})`;
    const result = await neode.cypher(cypher);

    return result
      ? console.log(`Init relationship success for Place`)
      : console.log("Init relationship for Place failure");
  },
};

module.exports = PlaceNeo4jService;
