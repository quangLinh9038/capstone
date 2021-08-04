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
    accommodationParams
  ) => {
    const accommsUniquePointList = [];

    //get main places
    const mainPlaces = await PlaceService.getLandmarkPlaces(placeParams);
    const firstPlacePoint = mainPlaces[0].unique_point;
    console.log(
      "🚀 ~ file: trip.service.js ~ line 37 ~ firstPlacePoint",
      firstPlacePoint
    );

    // get main accomms from
    const mainAccomms = await AccommodationService.getMainAccommodation(
      accommodationParams
    );

    mainAccomms.forEach((accommodation) => {
      accommsUniquePointList.push(accommodation.unique_point);
    });
    console.log(
      "🚀 ~ file: trip.service.js ~ line 49 ~ mainAccomms.forEach ~ accommsUniquePointList",
      accommsUniquePointList
    );

    //return shortest accommodation
    const shortestAccommodation =
      await TripNeo4jService.getShortestAccommodation(
        firstPlacePoint,
        accommsUniquePointList
      );

    const result = shortestAccommodation;

    return result;
  },
  // create new trip
  createTrips: async () => {
    try {
    } catch (error) {
      return error;
    }
  },
};

module.exports = TripService;
