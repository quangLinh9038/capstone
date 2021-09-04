const { Router } = require("express");
const TripController = require("../controllers/trip.controller");
const auth = require("../middleware/auth");

const tripRoutes = Router();

tripRoutes
  .get("/", auth, TripController.getAllTripByUser)
  .get("/:id", TripController.getOneTripById)
  .post("/", auth, TripController.createNewTrip)
  .put("/:id", TripController.updateTripById)
  .delete("/:id", TripController.deleteTripById)
  .delete("/", auth, TripController.deleteAllTripByUser);
module.exports = tripRoutes;
