const { Router } = require("express");
const AccommodationController = require("../controllers/accommodation.controller");

const accommodationRoutes = Router();

accommodationRoutes
  .get("/", AccommodationController.getAllAccommodations)
  .get("/get/interests", AccommodationController.getMainAccommodation)
  .post("/", AccommodationController.createAccommodations)
  .delete("/", AccommodationController.deleteAllAccommodations)
  .delete("/delete/neo4j", AccommodationController.deleteAccommsOnNeo4j);

module.exports = accommodationRoutes;
