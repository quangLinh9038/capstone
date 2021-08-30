const { Router } = require("express");
const TripController = require("../controllers/trip.controller");
const auth = require("../middleware/auth");

const tripRoutes = Router();

tripRoutes
  .get("/", TripController.getAllTrips)
  .get("/:id", TripController.getOneTripById)
  .post("/",auth, TripController.createNewTrip)
  .put("/:id",auth, TripController.updateTripById)
  .delete("/:id",auth, TripController.deleteTripById);

module.exports = tripRoutes;
