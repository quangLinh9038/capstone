const { Router } = require("express");
const ItineraryController = require("../controllers/itinerary.controller");

const itineraryRoutes = Router();

itineraryRoutes
  .get("/", ItineraryController.getAnItinerary)
  .get("/", ItineraryController.getAnItinerary);

module.exports = itineraryRoutes;
