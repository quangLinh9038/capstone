const { Router } = require("express");
const ItineraryController = require("../controllers/itinerary.controller");

const itineraryRoutes = Router();

itineraryRoutes
  .get("/", ItineraryController.getAnItinerary)
  .get("/:id", ItineraryController.getOneItinerary)
  .post("/", ItineraryController.createNewItinerary);

module.exports = itineraryRoutes;
