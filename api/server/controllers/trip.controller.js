/* 
  Import services
*/
const TripService = require("../service/trip.service");
const ItineraryService = require("../service/itinerary.service");
const PlaceService = require("../service/place.service");
const AccommodationService = require("../service/accommodation.service");
const CuisineService = require("../service/cuisine.service");
const UserService = require("../service/user.service");

const TripController = {
  getAllTripByUser: async (req, res) => {
    try {
      // Get user ID from client side token
      const uId = req.user.id;
      const user = await UserService.getUserInfo(uId);

      if (user) {
        const trips = await TripService.getAllTripByUser(uId);

        return res
          .status(200)
          .json({ status: "success", result: trips.length, data: trips });
      }
      return res.status(404).json({
        status: "failure",
        message: `Not found any Trips with User ID: ${uId}`,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getOneTripById: async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res
          .status(400)
          .json({ status: "failure", message: "Missing ID" });
      }

      const trip = await TripService.getOneTripById(id);

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
      /* Get Trip params */
      const uId = req.user.id;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      const tripTitle = req.body.title;

      /* 
        Get Itinerary params
      */
      const places = req.body.places;
      const accommodations = req.body.accommodations;
      const cuisines = req.body.cuisines;
      const totalPrice = req.body.totalPrice;
      const numberOfItems =
        places.length + accommodations.length + cuisines.length;

      if (
        !tripTitle.length &&
        !uId &&
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
        user_id: uId,
      });

      /* 
        Create new Itinerary
      */
      const newItinerary = await ItineraryService.createOneItinerary({
        numberOfItems: numberOfItems,
        totalPrice: totalPrice,
        trip_id: newTrip.id,
      });

      /* 
        Add Accommodations into Itinerary
      */
      for (const accommodation of accommodations) {
        const _accommodation =
          await AccommodationService.getOneAccommodationByUniquePoint(
            accommodation
          );
        await newItinerary.addAccommodation(_accommodation);
      }

      /* 
        Add Places into Itinerary
      */
      for (const place of places) {
        const _place = await PlaceService.getPlaceByUniquePoint(place);
        await newItinerary.addPlace(_place);
      }

      /* 
        Add Cuisines into Itinerary
      */
      for (const cuisine of cuisines) {
        const _cuisine = await CuisineService.getOneCuisineByUniquePoint(
          cuisine
        );
        await newItinerary.addCuisine(_cuisine);
      }

      return newTrip
        ? res.status(201).json({ status: "success", data: newTrip })
        : res.status(400).json({ status: "failure" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteTripById: async (req, res) => {
    try {
      const uid = req.user.id;

      const tripToDelete = await TripService.getOneTripById(id);

      if (tripToDelete) {
        await TripService.deleteTripById(tripToDelete);
        return res.status(204).json({
          status: "success",
          message: `Trip with ID: ${id} deleted successfully`,
        });
      }
      return res
        .status(404)
        .json({ status: "failure", message: `Trip with ${id} not found!` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteAllTripByUser: async (req, res) => {
    try {
      const uId = req.user.id;
      const user = await UserService.getUserInfo(uId);

      if (user) {
        const deletedTrips = await TripService.deleteAllTripByUser(uId);
        return deletedTrips
          ? res.status(200).json({
              status: "success",
              message: `Delete all Trips of User ID: ${uId}`,
            })
          : res.status(404).json({
              status: "failure",
              message: `Not found any Trips with User ID: ${uId} `,
            });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateTripById: async (req, res) => {
    try {
      const id = req.params.id;
      const tripToUpdate = req.body;

      const _tripToUpdate = await TripService.getOneTripById(id);

      if (!_tripToUpdate) {
        return res
          .status(404)
          .json({ status: "failure", message: `Trip with id ${id} not found` });
      }

      const updatedTrip = await TripService.updateTripById(id, tripToUpdate);

      return res.status(200).json({ status: "success", data: updatedTrip });
    } catch {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = TripController;
