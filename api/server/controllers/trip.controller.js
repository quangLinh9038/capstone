const TripService = require("../service/trip.service");

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
    } catch (error) {}
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
// createTrip: {
//   // get main place
//   // get main accomm
// }

// getPair: (params) {

// }
// // get main places
// // return 1 Place of interest --> unique_point

// // get main accomms
// // return list of 5 accomms -> accommList ({unique_point})

// // service
// // {Place, accommList} --> cypher.batch (findShortestPath (Place, accommList))
// // return (Place, Accomm)
// // unique_point

// // List place surround
