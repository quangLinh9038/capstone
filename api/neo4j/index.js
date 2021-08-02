/**
 * Define a Neode Instance
 */
const Neode = require("neode");
require("dotenv").config();
const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;
// Use configuration from .env
const neode = new Neode(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)
  // Include models in neo4j-models directory
  .with({
    Place: require("./models/Place.neo4j"),
    Accommodation: require("./models/Accommodation.neo4j"),
  });

module.exports = neode;

/**
 * Define Neo4j connection via driver
 */

// const neo4j = require("neo4j-driver");
// const config = require("./config/neo4j.config");

// const { neo4jUsername } = config;
// const { neo4jPassword } = config;

// const driver = neo4j.driver(
//   config.neo4j_url,
//   neo4j.auth.basic(neo4jUsername, neo4jPassword)
// );

// const session = driver.session();
