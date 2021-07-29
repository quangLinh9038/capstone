const { QueryTypes } = require("sequelize");
const Trip = require("../src/models").Trip;

const PlaceService = require(".//place.service");
const TripNeo4jService = require("../../neo4j/api/trip.api");
const AccommodationService = require(".//accommodation.service");

const TripService = {
  // get all tríp
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

  getShortestPair: async (placeParams, accommodationParams) => {
    //get main places

    console.log(`Place params in trip service: ${placeParams}`);
    const mainPlaces = await PlaceService.getLandmarkPlaces(placeParams);

    const firstPlacePoint = mainPlaces[0].unique_point;

    console.log(`a_point in trip service: ${accommodationParams}`);
    // get main accomms from

    const mainAccomms = await AccommodationService.getMainAccommodation(
      accommodationParams
    );
    console.log(`mainAccomm queired in trip service ${mainAccomms}`);

    const firstAccommsPoint = mainAccomms[0].unique_point;
    console.log(`accomms point in trip service: ${firstAccommsPoint}`);

    //return pair
    const pair = await TripNeo4jService.getShortestPair(
      firstPlacePoint,
      firstAccommsPoint
    );

    return pair;
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
