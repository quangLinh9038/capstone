const TripService = require("../service/trip.service");
const TripNeo4jService = require("../../neo4j/service/trip.neo4j.service");

const TripController = {
  getAllTrips: async (req, res) => {
    try {
      const trips = await TripService.getAllTrips();

      if (trips.length === null) {
        return res.status(204).send({ msg: `Empty Trips` });
      }

      return res.status(200).json(trips);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * GET the shortest Accommodation from landmark Place
   * Return Accommodation {unique_point} to show info
   */

  getShortestAccommodationFromMainPlace: async (req, res) => {
    try {
      const { placeParam1, placeParam2 } = req.query;
      const placeParams = [placeParam1, placeParam2];
      console.log(
        "🚀 ~ file: trip.controller.js ~ line 28 ~ getShortestAccommodationFromMainPlace: ~ placeParams",
        placeParams
      );

      const { accommodationParams } = req.query;
      console.log(
        "🚀 ~ file: trip.controller.js ~ line 34 ~ getShortestAccommodationFromMainPlace: ~ accommodationParams",
        accommodationParams
      );

      // check null params
      if (placeParams.length === 0 && accommodationParams.length === 0) {
        return res.status(400).send({ message: `Please input params` });
      }

      const result = await TripService.getShortestAccommodationFromMainPlace(
        placeParams,
        accommodationParams
      );
      console.log(
        "🚀 ~ file: trip.controller.js ~ line 37 ~ getShortestAccommodationFromMainPlace: ~ result",
        result
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },

  createTrip: async (req, res) => {
    try {
    } catch (error) {}
  },
};

module.exports = TripController;
