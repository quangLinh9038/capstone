const TripService = require("../service/trip.service");
const ItineraryService = require("../service/itinerary.service");
const PlaceService = require("../service/place.service");
const AccommodationService = require("../service/accommodation.service");
const CuisineService = require("../service/cuisine.service");

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

  getOneTripById: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(
        "🚀 ~ file: trip.controller.js ~ line 25 ~ getOneTripById: ~ id",
        id
      );

      if (!id) {
        return res
          .status(400)
          .json({ status: "failure", message: "Missing id " });
      }

      const trip = await TripService.getOneTripById(id);
      // console.log("🚀 ~ file: trip.controller.js ~ line 37 ~ getOneTripById: ~ trip", trip)

      return trip
        ? res.status(200).json({ status: "success", data: trip })
        : res
            .status(404)
            .json({ status: "failure", message: "Trip not found" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  createNewTrip: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: error.message });
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
      /* Get params */
      const user_id = req.body.user_id;
      const tripTitle = req.body.title;
      const places = req.body.places;
      const accommodations = req.body.accommodations;
      const cuisines = req.body.cuisines;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;

      const numberOfItems =
        places.length + accommodations.length + cuisines.length;

      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 108 ~ createNewTrip: ~ uId",
      // uId
      // );

      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 114 ~ createNewTrip: ~ tripTitle",
      // tripTitle
      // );

      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 120 ~ createNewTrip: ~ places",
      // places
      // );
      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 125 ~ createNewTrip: ~ accommodations",
      // accommodations
      // );
      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 130 ~ createNewTrip: ~ cuisines",
      // cuisines
      // );

      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 137 ~ createNewTrip: ~ numberOfItems",
      // numberOfItems
      // );

      if (
        !tripTitle.length &&
        !user_id &&
        !places.length &&
        !accommodations.length &&
        !cuisines.length &&
        !startDate.length &&
        !endDate.length
      ) {
        return res
          .status(400)
          .json({ status: "failure", message: "Missing request body" });
      }

      /* 
        Create new Trip
      */
      const newTrip = await TripService.createOneTrip({
        title: tripTitle,
        startDate: startDate,
        endDate: endDate,
        user_id: user_id,
      });
      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 151 ~ createNewTrip: ~ newTrip",
      // newTrip.id
      // );

      /* 
        Create new Itinerary
      */
      const newItinerary = await ItineraryService.createOneItinerary({
        numberOfItems: numberOfItems,
        trip_id: newTrip.id,
      });

      /* 
      Add Accommodations
      */
      for (const accommodation of accommodations) {
        const _accommodation =
          await AccommodationService.getOneAccommodationByUniquePoint(
            accommodation
          );

        // console.log(
        //   "🚀 ~ file: trip.controller.js ~ line 155 ~ createNewTrip: ~ _accommodation",
        //   _accommodation.length
        // );
        await newItinerary.addAccommodation(_accommodation);
      }

      /* 
        Add Places 
        */
      for (const place of places) {
        const _place = await PlaceService.getPlaceByUniquePoint(place);
        // console.log(
        //   "🚀 ~ file: trip.controller.js ~ line 166 ~ createNewTrip: ~ _place",
        //   _place.length
        // );

        await newItinerary.addPlace(_place);
      }

      /* 
        Add Cuisines 
      */
      for (const cuisine of cuisines) {
        const _cuisine = await CuisineService.getOneCuisineByUniquePoint(
          cuisine
        );
        // console.log(
        //   "🚀 ~ file: trip.controller.js ~ line 182 ~ createNewTrip: ~ _cuisine",
        //   _cuisine.length
        // );

        await newItinerary.addCuisine(_cuisine);
      }

      // console.log(
      // "🚀 ~ file: trip.controller.js ~ line 177 ~ createNewTrip: ~ newItinerary",
      // newItinerary
      // );
      return newTrip
        ? res.status(201).json({ status: "success", data: newTrip })
        : res.status(400).json({ status: "failure" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = TripController;
