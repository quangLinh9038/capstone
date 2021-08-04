const neode = require("../index");

const TripNeo4jService = {
  /**
   * This method takes Place {unique_point} and list of Accommodation {unique_point} as parameters
   * and returns the shortest Accommodation from Place with exact distance
   */
  getShortestAccommodation: async (
    placeUniquePoint,
    accommodationUniquePoint
  ) => {
    const result = await neode.cypher(
      `UNWIND [${accommodationUniquePoint}] AS accommsPoint
      MATCH (p:Place {unique_point: ${placeUniquePoint}})-[r:DISTANCE_TO]->(a:Accommodation {unique_point: accommsPoint})
      RETURN p, a, r.dist
      ORDER BY r.dist ASC;`
    );
    console.log("🚀 ~ file: trip.neo4j.service.js ~ line 18 ~ result", result);

    /**
     * Return the shortest Accomms data only
     */
    return result.records[0]._fields;
  },
};

module.exports = TripNeo4jService;
