const db = require("../src/models");
const { Itinerary } = db;

/* Import services */
const PlaceService = require("./place.service");
const AccommodationService = require("./accommodation.service");
const CuisineService = require("./cuisine.service");
const ItineraryNeo4jService = require("../../neo4j/service/itinerary.neo4j.service");
const CuisineNeo4jService = require("../../neo4j/service/cuisine.neo4j.service");

const ItineraryService = {
  createOneItinerary: async (newItinerary) => {
    try {
      return await Itinerary.create(newItinerary);
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
      // // console.log(
      // // "🚀 ~ file: trip.service.js ~ line 40 ~ accommodationLimit",
      // // accommodationLimit
      // // );
      const accommodationUniquePointList = [];

      //get main places
      const mainPlaces = await PlaceService.getLandmarkPlaces(
        placeParams,
        placeLimit
      );
      // // console.log(
      // // "🚀 ~ file: trip.service.js ~ line 41 ~ mainPlaces",
      // // mainPlaces.length
      // // );

      const mainAccommodations =
        await AccommodationService.getMainAccommodation(
          accommodationParams,
          accommodationLimit
        );
      // // console.log(
      // // "🚀 ~ file: trip.service.js ~ line 47 ~ mainAccomms",
      // // mainAccommodations.length
      // // );

      if (!mainPlaces || !mainAccommodations) {
        return null;
      }

      /**
       * Get unique_point as parameters
       */
      const firstPlacePoint = mainPlaces[0].unique_point;
      // // console.log(
      // // "🚀 ~ file: trip.service.js ~ line 45 ~ firstPlacePoint",
      // // firstPlacePoint
      // // );

      /*  
        Get main accomms unique_point list
        */
      mainAccommodations.forEach((accommodation) => {
        accommodationUniquePointList.push(accommodation.unique_point);
      });
      // // console.log(
      // // "🚀 ~ file: trip.service.js ~ line 74 ~ mainAccomms.forEach ~ accommodationUniquePointList",
      // // accommodationUniquePointList
      // // );

      //return shortest accommodation
      const firstPlaceAndShortestAccommodation =
        await ItineraryNeo4jService.getFirstPlaceAndShortestAccommodation(
          firstPlacePoint,
          accommodationUniquePointList
        );

      // check null response
      if (!firstPlaceAndShortestAccommodation.length) {
        // // console.log(
        // // "🚀 ~ file: trip.service.js ~ line 87 ~ firstPlaceAndShortestAccommodation",
        // // firstPlaceAndShortestAccommodation
        // // );

        return null;
      }

      // // console.log(
      // // "🚀 ~ file: trip.service.js ~ line 96 ~ firstPlaceAndShortestAccommodation",
      // // firstPlaceAndShortestAccommodation
      // // );

      return firstPlaceAndShortestAccommodation;
    } catch (error) {
      return error;
    }
  },

  getShortestLunchCuisine: async (
    shortestAccommodationUniquePoint,
    cuisineParams,
    cuisineLimit
  ) => {
    try {
      const cuisineUniquePointList = [];
      const mainCuisines = await CuisineService.getMainCuisine(
        cuisineParams,
        cuisineLimit
      );
      console.log(
        "🚀 ~. file: itinerary.service.js ~ line 116 ~ mainCuisines",
        mainCuisines
      );

      mainCuisines.forEach((cuisine) => {
        cuisineUniquePointList.push(cuisine.unique_point);
      });

      if (cuisineUniquePointList.length === 0) {
        console.log(
          "🚀 ~ file: itinerary.service.js ~ line 120 ~ mainCuisines.forEach ~ cuisineUniquePointList is empty",
          cuisineUniquePointList
        );
      }

      const shortestLunchCuisine =
        await ItineraryNeo4jService.getShortestLunchCuisine(
          cuisineUniquePointList,
          shortestAccommodationUniquePoint
        );

      console.log(
        "🚀 ~ file: itinerary.service.js ~ line 131 ~ shortestLunchCuisine",
        shortestLunchCuisine
      );

      return shortestLunchCuisine;
    } catch (error) {
      return error;
    }
  },

  getMainPlaces: async (
    placeParams,
    placeLimit,
    shortestCuisineUniquePoint
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
      const mainPlacesForAItinerary =
        await ItineraryNeo4jService.getMainPlacesForOneItinerary(
          shortestCuisineUniquePoint,
          placeUniquePointList
        );
      // console.log(
      // "🚀 ~ file: trip.service.js ~ line 125 ~ mainPlacesForATrip",
      // mainPlacesForATrip
      // );

      return mainPlacesForAItinerary;
    } catch (error) {
      return error;
    }
  },

  getShortestDinnerCuisine: async (
    dinnerCuisineParams,
    cuisineLimit,
    placeUniquePoint
  ) => {
    try {
      const dinnerCuisineUniquePointList = [];
      const mainDinnerCuisine = await CuisineService.getMainCuisine(
        dinnerCuisineParams,
        cuisineLimit
      );
      console.log(
        "🚀 ~ file: itinerary.service.js ~ line 198 ~ mainDinnerCuisine",
        mainDinnerCuisine.length
      );

      mainDinnerCuisine.forEach((cuisine) => {
        dinnerCuisineUniquePointList.push(cuisine.unique_point);
      });

      console.log(
        "🚀 ~ file: itinerary.service.js ~ line 207 ~ dinnerCuisineUniquePointList",
        dinnerCuisineUniquePointList.length
      );

      const shortestDinnerCuisine =
        await ItineraryNeo4jService.getShortestDinnerCuisine(
          dinnerCuisineUniquePointList,
          placeUniquePoint
        );

      console.log(
        "🚀 ~ file: itinerary.service.js ~ line 218 ~ shortestDinnerCuisine ~ ItineraryNeo4j cannot get shortestDinnerCuisine",
        shortestDinnerCuisine
      );

      return shortestDinnerCuisine;
    } catch (error) {
      return error;
    }
  },
};
module.exports = ItineraryService;
