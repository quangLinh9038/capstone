/* 
  Import models
*/
const db = require("../src/models");
const { Trip } = db;
const { User } = db;
const { Itinerary } = db;
const { Place } = db;
const { Accommodation } = db;
const { Cuisine } = db;

/* 
  Import services
*/
const PlaceService = require("./place.service");
const AccommodationService = require("./accommodation.service");
const TripNeo4jService = require("../../neo4j/service/trip.neo4j.service");

const TripService = {
  getAllTrips: async () => {
    try {
      return await Trip.findAll({
        include: [
          {
            model: Itinerary,
            as: "itineraries",
            include: [
              {
                model: Place,
                as: "places",
              },
              {
                model: Accommodation,
                as: "accommodations",
              },
              {
                model: Cuisine,
                as: "cuisines",
              },
            ],
          },
          {
            model: User,
            as: "user",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  createOneTrip: async (newTrip) => {
    try {
      return await Trip.create(newTrip);
    } catch (error) {
      return error;
    }
  },

  getFirstPlaceAndShortestAccommodation: async (
    placeParams,
    placeLimit,
    accommodationParams,
    accommodationLimit
  ) => {
    try {
      // console.log(
      // "🚀 ~ file: trip.service.js ~ line 40 ~ accommodationLimit",
      // accommodationLimit
      // );
      const accommodationUniquePointList = [];

      //get main places
      const mainPlaces = await PlaceService.getLandmarkPlaces(
        placeParams,
        placeLimit
      );
      // console.log(
      // "🚀 ~ file: trip.service.js ~ line 41 ~ mainPlaces",
      // mainPlaces.length
      // );

      const mainAccommodations =
        await AccommodationService.getMainAccommodation(
          accommodationParams,
          accommodationLimit
        );
      // console.log(
      // "🚀 ~ file: trip.service.js ~ line 47 ~ mainAccomms",
      // mainAccommodations.length
      // );

      if (!mainPlaces || !mainAccommodations) {
        return null;
      }

      /**
       * Get unique_point as parameters
       */
      const firstPlacePoint = mainPlaces[0].unique_point;
      // console.log(
      // "🚀 ~ file: trip.service.js ~ line 45 ~ firstPlacePoint",
      // firstPlacePoint
      // );

      /*  
      Get main accomms unique_point list
      */
      mainAccommodations.forEach((accommodation) => {
        accommodationUniquePointList.push(accommodation.unique_point);
      });
      // console.log(
      // "🚀 ~ file: trip.service.js ~ line 74 ~ mainAccomms.forEach ~ accommodationUniquePointList",
      // accommodationUniquePointList
      // );

      //return shortest accommodation
      const firstPlaceAndShortestAccommodation =
        await TripNeo4jService.getFirstPlaceAndShortestAccommodation(
          firstPlacePoint,
          accommodationUniquePointList
        );

      // check null response
      if (!firstPlaceAndShortestAccommodation.length) {
        // console.log(
        // "🚀 ~ file: trip.service.js ~ line 87 ~ firstPlaceAndShortestAccommodation",
        // firstPlaceAndShortestAccommodation
        // );

        return null;
      }

      // console.log(
      // "🚀 ~ file: trip.service.js ~ line 96 ~ firstPlaceAndShortestAccommodation",
      // firstPlaceAndShortestAccommodation
      // );

      return firstPlaceAndShortestAccommodation;
    } catch (error) {
      return error;
    }
  },

  getMainPlacesForATrip: async (
    placeParams,
    placeLimit,
    shortestAccommodationUniquePoint
  ) => {
    try {
      const placeUniquePointList = [];

      const landmarkPlaces = await PlaceService.getLandmarkPlaces(
        placeParams,
        placeLimit
      );

      landmarkPlaces.forEach((places) =>
        placeUniquePointList.push(places.unique_point)
      );

      // console.log(
      // "🚀 ~ file: trip.service.js ~ line 118 ~ placeUniquePointList",
      // placeUniquePointList
      // );
      const mainPlacesForATrip = await TripNeo4jService.getMainPlacesForATrip(
        shortestAccommodationUniquePoint,
        placeUniquePointList
      );
      // console.log(
      // "🚀 ~ file: trip.service.js ~ line 125 ~ mainPlacesForATrip",
      // mainPlacesForATrip
      // );

      return mainPlacesForATrip;
    } catch (error) {
      return error;
    }
  },
};

module.exports = TripService;
