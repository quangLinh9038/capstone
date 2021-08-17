const TripService = require("../service/trip.service");
const TripNeo4jService = require("../../neo4j/service/trip.neo4j.service");
const Trip = require("../src/models/Trip");

const TripController = {
  getAllTrips: async (req, res) => {
    try {
      const trips = await TripService.getAllTrips();

      if (!trips.length) {
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
  getATripForOneDay: async (req, res) => {
    try {
      const mainPlacesUniquePoint = [];

      const { placeParam1, placeParam2, placeLimit } = req.query;

      if (!placeParam1 || !placeParam2 || !placeLimit) {
        return res.status(400).send({ msg: "Place params missing" });
      }
      const placeParams = [placeParam1, placeParam2];
      console.log(
        "🚀 ~ file: trip.controller.js ~ line 32 ~ getATripForOneDay: ~ placeParams",
        placeParams
      );

      const { accommodationParams, accommodationLimit } = req.query;
      console.log(
        "🚀 ~ file: trip.controller.js ~ line 36 ~ getATripForOneDay: ~ accommodationParams",
        accommodationParams
      );
      if (!accommodationParams || !accommodationLimit) {
        return res.status(400).send({ msg: "Accommodation params missing" });
      }

      const firstPlaceAndShortestAccommodation =
        await TripService.getFirstPlaceAndShortestAccommodation(
          placeParams,
          placeLimit,
          accommodationParams,
          accommodationLimit
        );

      const shortestAccommodation = firstPlaceAndShortestAccommodation[1];

      const aTripForOneDay = await TripService.getMainPlacesForATrip(
        placeParams,
        placeLimit,
        shortestAccommodation
      );
      console.log(
        "🚀 ~ file: trip.controller.js ~ line 51 ~ getATripForOneDay: ~ aTripForOneDay",
        aTripForOneDay
      );

      if (aTripForOneDay.length === 0) {
        return res.status(404).send({ message: "Not found data" });
      }

      aTripForOneDay.forEach((item) =>
        mainPlacesUniquePoint.push(item._fields[0])
      );

      console.log(
        "🚀 ~ file: trip.controller.js ~ line 74 ~ getATripForOneDay: ~ mainPlacesUniquePoint",
        mainPlacesUniquePoint
      );
      return res.status(200).json({
        status: "success",
        results: {
          firstPlaceAndShortestAccommodation:
            firstPlaceAndShortestAccommodation.length,
          mainPlaces: mainPlacesUniquePoint.length,
        },
        data: {
          firstPlaceAndAccommodation: firstPlaceAndShortestAccommodation,

          interestedPlaces: mainPlacesUniquePoint,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },

  createNewTrip: async (req, res) => {
    try {
      /* Get params */
      // Trip.create(newTrip)
    } catch (error) {}
  },
};

module.exports = TripController;
