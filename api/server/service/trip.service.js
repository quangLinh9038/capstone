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
    const mainPlaces = await PlaceService.getLandmarkPlaces(placeParams);

    const firstPlacePoint = mainPlaces[0].unique_point;
    /// --> return P1

    // get main accomms from
    const accommsList = await AccommodationService.getMainAccommodation(
      accommodationParams
    );

    //return pair
    const pair = await TripNeo4jService.getShortestPair(
      firstPlacePoint,
      accommsList
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
