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

  deletePlaces: async () => {
    // DELETE (p:Place) DETACH DELETE p;
    return await neode
      .deleteAll("Place")
      .then(() => console.log("Delete all Place nodes!!!"));
  },

  // test case
  getMainPlaces: async (unique_point) => {
    // get landmark Place nodes
    // matched unique_point with postgres
    return await neode
      .cypher(`MATCH (p:Place {unique_point: ${unique_point}}) RETURN p;`)
      .then(console.log("Place queried on Neo4j"));
  },

  // init relationship between Place and Accommodation to create distance
  initRelationship: async () => {
    return await neode
      .cypher(
        `CALL apoc.periodic.iterate(
      "MATCH (p:Place), (a:Accommodation)
      WHERE NOT (p) -[:DISTANCE_TO]->(a) WITH point({longitude:p.lng, latitude:p.lat}) as p1,
      point({longitude: a.lng, latitude: a.lat}) as p2, p, a WITH distance(p1, p2) as distance, p, a
      RETURN p, a, distance",
      "CREATE (p)-[:DISTANCE_TO {dist: distance}]-> (a) RETURN p, a",
      {batchSize: 1000, parallel: true})`
      )
      .then(console.log(`Init relationship success`));
  },
};

module.exports = PlaceNeo4jService;
