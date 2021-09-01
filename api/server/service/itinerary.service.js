const db = require("../src/models");
const { Itinerary } = db;
const { Place } = db;
const { Accommodation } = db;
const { Cuisine } = db;

/* Import services */
const PlaceService = require("./place.service");
const AccommodationService = require("./accommodation.service");
const CuisineService = require("./cuisine.service");
const ItineraryNeo4jService = require("../../neo4j/service/itinerary.neo4j.service");

const ItineraryService = {
  getOneItineraryById: async (id) => {
    try {
      return await Itinerary.findOne({
        where: { id: id },
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
      });
    } catch (error) {
      return error;
    }
  },

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
    accommodationPrice,
    accommodationLimit
  ) => {
    try {
      const accommodationUniquePointList = [];
      const duplicatedPlace = null;

      //get main places
      const landmarkPlaces = await PlaceService.getLandmarkPlaces(
        placeParams,
        placeLimit,
        duplicatedPlace
      );

      const mainAccommodations =
        await AccommodationService.getMainAccommodation(
          accommodationParams,
          accommodationPrice,
          accommodationLimit
        );

      if (!landmarkPlaces || !mainAccommodations) {
        return null;
      }

      /**
       * Get unique_point as parameters
       */
      const firstPlacePoint = landmarkPlaces[0].unique_point;

      /*  
        Get main accomms unique_point list
        */
      mainAccommodations.forEach((accommodation) => {
        accommodationUniquePointList.push(accommodation.unique_point);
      });

      //return shortest accommodation
      const firstPlaceAndShortestAccommodation =
        await ItineraryNeo4jService.getFirstPlaceAndShortestAccommodation(
          firstPlacePoint,
          accommodationUniquePointList
        );

      // check null response
      if (!firstPlaceAndShortestAccommodation.length) {
        return null;
      }

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

      const typeOfCuisine = "lunch";
      const mainCuisines = await CuisineService.getMainCuisine(
        cuisineParams,
        typeOfCuisine,
        cuisineLimit
      );

      mainCuisines.forEach((cuisine) => {
        cuisineUniquePointList.push(cuisine.unique_point);
      });

      const shortestLunchCuisine =
        await ItineraryNeo4jService.getShortestLunchCuisine(
          cuisineUniquePointList,
          shortestAccommodationUniquePoint
        );

      return shortestLunchCuisine;
    } catch (error) {
      return error;
    }
  },

  getMainPlaces: async (
    placeParams,
    placeLimit,
    shortestCuisineUniquePoint,
    duplicatedPlace
  ) => {
    try {
      const placeUniquePointList = [];

      const mainPlaces = await PlaceService.getLandmarkPlaces(
        placeParams,
        placeLimit,
        duplicatedPlace
      );

      mainPlaces.forEach((places) =>
        placeUniquePointList.push(places.unique_point)
      );

      const mainPlacesForAnItinerary =
        await ItineraryNeo4jService.getMainPlacesForOneItinerary(
          shortestCuisineUniquePoint,
          placeUniquePointList
        );

      return mainPlacesForAnItinerary;
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

      const typeOfCuisine = "dinner";
      const mainDinnerCuisine = await CuisineService.getMainCuisine(
        dinnerCuisineParams,
        typeOfCuisine,
        cuisineLimit
      );

      mainDinnerCuisine.forEach((cuisine) => {
        dinnerCuisineUniquePointList.push(cuisine.unique_point);
      });

      const shortestDinnerCuisine =
        await ItineraryNeo4jService.getShortestDinnerCuisine(
          dinnerCuisineUniquePointList,
          placeUniquePoint
        );

      return shortestDinnerCuisine;
    } catch (error) {
      return error;
    }
  },
};
module.exports = ItineraryService;
