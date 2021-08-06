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
    try {
      console.log(
        "🚀 ~ file: trip.neo4j.service.js ~ line 12 ~ accommodationUniquePoint",
        accommodationUniquePoint
      );
      console.log(
        "🚀 ~ file: trip.neo4j.service.js ~ line 12 ~ placeUniquePoint",
        placeUniquePoint
      );
      const result = await neode.cypher(
        `UNWIND [${accommodationUniquePoint}] AS accommsPoint
      MATCH (p:Place {unique_point: ${placeUniquePoint}})-[r:DISTANCE_TO]->(a:Accommodation {unique_point: accommsPoint}) 
      RETURN p.unique_point, a.unique_point, r.dist
      ORDER BY r.dist ASC;`
      );
      console.log(
        "🚀 ~ file: trip.neo4j.service.js ~ line 18 ~ result",
        result.records[1].length
      );

      /**
       * Return the shortest Accomms data only
       */
      return result.records[1]._fields;
    } catch (error) {
      return error;
    }
  },

  getMainPlacesForATrip: async (
    shortestAccommodationUniquePoint,
    placeUniquePoints
  ) => {
    try {
      const result = await neode.cypher(
        `UNWIND [${placeUniquePoints}] AS placesPoint
        MATCH (a:Accommodation {unique_point: ${shortestAccommodationUniquePoint}})-[r:DISTANCE_TO]-(p:Place {unique_point: placesPoint}) 
        RETURN a, p, r.dist
        ORDER BY r.dist ASC;`
      );

      console.log(
        "🚀 ~ file: trip.neo4j.service.js ~ line 44 ~ getMainPlacesForATrip: ~ result",
        result
      );

      return result.records;
    } catch (error) {
      return error;
    }
  },
};

module.exports = TripNeo4jService;

// UNWIND [126.88721050000001,126.88773195,126.84506637,126.88488105,126.88473937] AS placesPoint
// MATCH (a:Accommodation {unique_point: 126.8798832})-[r:DISTANCE_TO]-(p:Place {unique_point: placesPoint})
// RETURN a, p, r.dist
// ORDER BY r.dist ASC
