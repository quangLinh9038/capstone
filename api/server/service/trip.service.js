const Trip = require("../src/models").Trip;

const PlaceService = require("./place.service");
const AccommodationService = require("./accommodation.service");
const TripNeo4jService = require("../../neo4j/service/trip.neo4j.service");

const TripService = {
  // get all trip
  getAllTrips: async () => {
    try {
      return await Trip.findAll({
        includes: [
          {
            model: Place,
            as: "places",
          },
          {
            model: Accommodation,
            as: "accommodations",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  getShortestAccommodationFromMainPlace: async (
    placeParams,
    placeLimit,
    accommodationParams
  ) => {
    try {
      let trip;
      const accommsUniquePointList = [];

      //get main places
      const mainPlaces = await PlaceService.getLandmarkPlaces(
        placeParams,
        placeLimit
      );
      console.log(
        "🚀 ~ file: trip.service.js ~ line 41 ~ mainPlaces",
        mainPlaces.length
      );

      const mainAccomms = await AccommodationService.getMainAccommodation(
        accommodationParams
      );
      console.log(
        "🚀 ~ file: trip.service.js ~ line 47 ~ mainAccomms",
        mainAccomms.length
      );

      /**
       * Get unique_point as parameters
       */
      const firstPlacePoint = mainPlaces[0].unique_point;
      console.log(
        "🚀 ~ file: trip.service.js ~ line 45 ~ firstPlacePoint",
        firstPlacePoint
      );

      // get main accomms
      mainAccomms.forEach((accommodation) => {
        accommsUniquePointList.push(accommodation.unique_point);
      });

      console.log(
        "🚀 ~ file: trip.service.js ~ line 34 ~ accommsUniquePointList",
        accommsUniquePointList
      );
      //return shortest accommodation
      const shortestAccommodation =
        await TripNeo4jService.getShortestAccommodation(
          firstPlacePoint,
          accommsUniquePointList
        );

      // check null response
      if (!shortestAccommodation.length) {
        console.log(
          "🚀 ~ file: trip.service.js ~ line 65 ~ !shortestAccommodation.length",
          "Result null"
        );
        return null;
      }

      console.log(
        "🚀 ~ file: trip.service.js ~ line 74 ~ shortestAccommodation",
        shortestAccommodation[1]
      );

      return shortestAccommodation[1];
    } catch (error) {
      return error;
    }
  },
  // create new trip
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

      console.log(
        "🚀 ~ file: trip.service.js ~ line 118 ~ placeUniquePointList",
        placeUniquePointList
      );
      const mainPlacesForATrip = await TripNeo4jService.getMainPlacesForATrip(
        shortestAccommodationUniquePoint,
        placeUniquePointList
      );
      console.log(
        "🚀 ~ file: trip.service.js ~ line 125 ~ mainPlacesForATrip",
        mainPlacesForATrip
      );

      return mainPlacesForATrip;
    } catch (error) {
      return error;
    }
  },
};

module.exports = TripService;
