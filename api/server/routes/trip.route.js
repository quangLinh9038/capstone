const { Router } = require("express");
const TripController = require("../controllers/trip.controller");

const tripRoutes = Router();

tripRoutes
  .get("/", TripController.getAllTrips)
  .get("/:id", TripController.getOneTripById)
  .post("/", TripController.createNewTrip)
  .put("/:id", TripController.updateTripById)
  .delete("/:id", TripController.deleteTripById);

module.exports = tripRoutes;
