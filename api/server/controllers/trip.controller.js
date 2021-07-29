const TripService = require("../service/trip.service");
const TripNeo4jService = require("../../neo4j/api/trip.api");

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

  getPair: async (req, res) => {
    try {
      const { placeParam1, placeParam2 } = req.query;
      const placeParams = [placeParam1, placeParam2];
      console.log(`place in controller: ${placeParams}`);

      const { accommodationParams } = req.query;
      // const a_param = [accommodationParams];
      const a_point = [accommodationParams];
      console.log(`a_param in copntroller: ${a_point}`);

      const pair = await TripService.getShortestPair(
        placeParams,
        accommodationParams
      );
      console.log(`pair ${pair}`);
      // .then((res) => res.toJSON())
      // .then((json) => {
      //   res.send(json);
      // });

      return res.status(200).send(pair);
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },

  /**
   * GET pair Place, Accommodation --> shortest path
   */
  createTrip: async (req, res) => {
    try {
    } catch (error) {}
  },
};

module.exports = TripController;
