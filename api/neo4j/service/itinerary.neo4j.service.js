const neode = require("../index");

const ItineraryNeo4jService = {
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
      // console.log(
      //   "🚀 ~ file: trip.neo4j.service.js ~ line 22 ~ _accommodationUniquePointList",
      //   _accommodationUniquePointList
      // );

      const result = await neode.cypher(
        `UNWIND [${_accommodationUniquePointList}] AS accommsPoint
      MATCH (p:Place {unique_point: "${placeUniquePoint}"})-[r:DISTANCE_TO]->(a:Accommodation {unique_point: accommsPoint}) 
      RETURN p.unique_point, a.unique_point, r.dist
      ORDER BY r.dist ASC;`
      );
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

  getShortestLunchCuisine: async (
    cuisineUniquePoints,
    shortestAccommodationUniquePoint
  ) => {
    try {
      const _cuisineUniquePoints = cuisineUniquePoints.map(
        (item) => `"${item}"`
      );
      console.log(
        "🚀 ~ file: itinerary.neo4j.service.js ~ line 55 ~ _cuisineUniquePoints",
        _cuisineUniquePoints
      );

      const cypher = `UNWIND [${_cuisineUniquePoints}] AS placesPoint
      MATCH (a:Accommodation {unique_point: "${shortestAccommodationUniquePoint}"})-[r:DISTANCE_TO]-(p:Place {unique_point: placesPoint}) 
      RETURN p.unique_point, r.dist
      ORDER BY r.dist ASC;`;

      const result = await neode.cypher(cypher);
      console.log(
        "🚀 ~ file: itinerary.neo4j.service.js ~ line 59 ~ result",
        result
      );
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

      const result = await neode.cypher(
        `UNWIND [${_placeUniquePoints}] AS placesPoint
        MATCH (a:Accommodation {unique_point: "${shortestAccommodationUniquePoint}"})-[r:DISTANCE_TO]-(p:Place {unique_point: placesPoint}) 
        RETURN p.unique_point, r.dist
        ORDER BY r.dist ASC;`
      );

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

module.exports = ItineraryNeo4jService;
