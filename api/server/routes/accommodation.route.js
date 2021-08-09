const { Router } = require("express");
const AccommodationController = require("../controllers/accommodation.controller");

const accommodationRoutes = Router();

accommodationRoutes
  .get("/", AccommodationController.getAllAccommodations)
  .get("/get/interests/", AccommodationController.getMainAccommodation)
  .post("/", AccommodationController.createAccommodations)
  .delete("/", AccommodationController.deleteAllAccommodations)
  .delete("/:id/", AccommodationController.deleteAccommodationById);
module.exports = accommodationRoutes;
