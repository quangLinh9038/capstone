const neode = require("../index");

/* 
  Import utils
*/
const generateCypherToFindRoute = require("../../server/utils/generateCypherToFindRoute");

const placeLabel = "Place";
const accommodationLabel = "Accommodation";
const cuisineLabel = "Cuisine";

const TripNeo4jService = {
  /**
   * This method takes Place {unique_point} and list of Accommodation {unique_point} as parameters
   * and returns the shortest Accommodation from Place with exact distance
   */
  getFirstPlaceAndShortestAccommodation: async (
    placeUniquePoint,
    accommodationUniquePointList
  ) => {
    try {
      // console.log(
      // "🚀 ~ file: trip.neo4j.service.js ~ line 12 ~ placeUniquePoint",
      // placeUniquePoint
      // );

      const _accommodationUniquePointList = accommodationUniquePointList.map(
        (item) => `"${item}"`
      );
      console.log(
        "🚀 ~ file: trip.neo4j.service.js ~ line 22 ~ _accommodationUniquePointList",
        _accommodationUniquePointList
      );

      const cypher = generateCypherToFindRoute(
        _accommodationUniquePointList,
        placeUniquePoint,
        placeLabel,
        accommodationLabel
      );
      // console.log(
      // "🚀 ~ file: trip.neo4j.service.js ~ line 41 ~ cypher",
      // cypher
      // );

      const result = await neode.cypher(cypher);
      // console.log(
      // "🚀 ~ file: trip.neo4j.service.js ~ line 18 ~ result",
      // result.records[1]._fields
      // );

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
      // console.log(
      // "🚀 ~ file: trip.neo4j.service.js ~ line 51 ~ shortestAccommodationUniquePoint",
      // shortestAccommodationUniquePoint
      // );
      const _placeUniquePoints = placeUniquePoints.map((item) => `"${item}"`);

      const cypher = generateCypherToFindRoute(
        _placeUniquePoints,
        shortestAccommodationUniquePoint,
        accommodationLabel,
        placeLabel
      );
      // console.log(
      // "🚀 ~ file: trip.neo4j.service.js ~ line 78 ~ cypher",
      // cypher
      // );

      const result = await neode.cypher(cypher);
      // console.log(
      // "🚀 ~ file: trip.neo4j.service.js ~ line 44 ~ getMainPlacesForATrip: ~ result",
      // result.records
      // );

      return result.records;
    } catch (error) {
      return error;
    }
  },
};

module.exports = TripNeo4jService;
