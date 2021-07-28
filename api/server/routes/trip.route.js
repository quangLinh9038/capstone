const { Router } = require("express");
const TripController = require("../controllers/trip.controller");

const tripRoutes = Router();

tripRoutes.get("/", TripController.getAllTrips);

module.exports = tripRoutes;
