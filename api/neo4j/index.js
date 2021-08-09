const Neode = require("neode");
require("dotenv").config();

const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

/**
 * Define a Neode Instance
 * Use configuration from .env
 * */

const neode = new Neode(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)
  // Include models in neo4j-models directory
  .with({
    Place: require("./models/Place.neo4j"),
    Accommodation: require("./models/Accommodation.neo4j"),
  });

module.exports = neode;
