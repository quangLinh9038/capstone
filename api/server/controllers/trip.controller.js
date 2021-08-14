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
      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 32 ~ getATripForOneDay: ~ placeParams",
      // placeParams
      // );

      const { accommodationParams, accommodationLimit } = req.query;
      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 36 ~ getATripForOneDay: ~ accommodationParams",
      // accommodationParams
      // );
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
      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 51 ~ getATripForOneDay: ~ aTripForOneDay",
      // aTripForOneDay
      // );

      if (aTripForOneDay.length === 0) {
        return res.status(404).send({ message: "Not found data" });
      }

      aTripForOneDay.forEach((item) =>
        mainPlacesUniquePoint.push(item._fields[0])
      );

      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 74 ~ getATripForOneDay: ~ mainPlacesUniquePoint",
      // mainPlacesUniquePoint
      // );
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
      /* Params */
      // start/end date
      // placeParam / placeLimit
      // accommodationParam / accommLimit
      // trip title
      // user_id
      /* Services */
      // getFirstPlaceAndShortestAccommodation(placeParma, placeLimit, accommParams, accommLimit)
      // return result(firstPlace, shortestAccomm)
      // const shortestAccomm = result[1]
      // getMainPlacesForATrip(placeParams, placeLimit, shortestAccomm)
      // return mainPlaceResult = []
      /* const newTrip = new Trip [
          title: this.title
          date: this.date
          user_id: this user_id, 
          itinerary: {
            "firstPlaceAndAccommodation": [
              "97b3426a-c4d9-402d-82f1-c2d9b7e45015",
              "84891c89-fd1e-44b1-8e2f-25325cdf4988",
              7385.2176963454785
            ],
          "interestedPlaces": [
            "88dea52d-6a91-43c3-901b-9c3a52c7b2f5",
            "a8523996-a058-4cbf-9383-93fcd18486dd",
            "2ba59657-2c2a-47b4-b500-0cdb6b66d66b",
            "8556e3be-b55c-437c-83d3-eb96a3974b9e",
            "60437d7b-6d52-4ae8-a518-e47178657e01",
        "e8749a5c-2171-48da-94a0-8ead5ed057aa",
      "1473057b-1bbf-48b5-a3db-17a6b8c7bbb7",
      "344218fc-34a8-4258-b747-274b0c479ad0",
      "3f03c8a7-4105-4986-9b8b-a1f0c71fd551",
      "97b3426a-c4d9-402d-82f1-c2d9b7e45015"
    ]

          },
          places: {

          }
        */
      // interestedPLace.forEach((item) =>
      //   Trip.addPlace({ where: { unique_point: item.unique_point } })
      // );
      // Trip.create(newTrip)
    } catch (error) {}
  },
};

module.exports = TripController;
