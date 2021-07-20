/**
 * Define a Neode Instance
 */
const neode = require("neode")
  // Use configuration from .env
  .fromEnv()

  // Include models in neo4j-models directory
  .with({
    // eslint-disable-next-line global-require
    Place: require("./neo4j-models/Place.neo4j"),
    Accommodation: require("./neo4j-models/Accommodation.neo4j"),
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
