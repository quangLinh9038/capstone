const Neode = require("neode");
const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD, NEO4J_ENCRYPTION } =
  process.env;

const PlaceNeo4j = require("./models/Place.neo4j");
const AccommodationNeo4j = require("./models/Accommodation.neo4j");
const Cuisine = require("./models/Cuisine.neo4j");

/* 
  Define a Neode Instance
  Use configuration from .env
*/

const neode = new Neode.fromEnv()
  // Include models in neo4j-models directory
  .with({
    Place: PlaceNeo4j,
    Accommodation: AccommodationNeo4j,
    Cuisine: Cuisine,
  });

module.exports = neode;
