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
    return await neode.writeCypher(cypher);
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
  initRelationshipToAccommodation: async () => {
    const cypher = `CALL apoc.periodic.iterate(
      "MATCH (p:Place), (a:Accommodation)
      WHERE NOT (p)-[:DISTANCE_TO]->(a)
      WITH point({longitude:p.lng, latitude:p.lat}) as p1,
      point({longitude: a.lng, latitude: a.lat}) as p2, p, a
      WITH distance(p1, p2) as distance, p, a
      RETURN p, a, distance",
      "CREATE (p)-[:DISTANCE_TO {dist: distance}]->(a) RETURN p, a",
      {batchSize: 1000, parallel: true})`;

    const result = await neode.writeCypher(cypher);

    return result
      ? console.log(`Init relationship success Place to Accommodation`)
      : console.log("Init relationship failure Place to Accommodation");
  },

  initRelationshipToCuisine: async () => {
    const cypher = `CALL apoc.periodic.iterate(
      "MATCH (p:Place), (c:Cuisine)
      WHERE NOT (p)-[:DISTANCE_TO]->(c)
      WITH point({longitude:p.lng, latitude:p.lat}) as p1,
      point({longitude: c.lng, latitude: c.lat}) as p2, p, c
      WITH distance(p1, p2) as distance, p, c
      RETURN p, c, distance",
      "CREATE (p)-[:DISTANCE_TO {dist: distance}]->(c) RETURN p, c",
      {batchSize: 1000, parallel: true})`;

    const result = await neode.writeCypher(cypher);

    return result
      ? console.log(`Init relationship success Place to Cuisine`)
      : console.log("Init relationship failure Place to Cuisine");
  },
};

module.exports = PlaceNeo4jService;
