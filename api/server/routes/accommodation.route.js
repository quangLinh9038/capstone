const { Router } = require("express");
const AccommodationController = require("../controllers/accommodation.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const accommodationRoutes = Router();

accommodationRoutes
  .get("/", AccommodationController.getAllAccommodations)
  .get("/interests/", AccommodationController.getMainAccommodation)
  .post("/", auth, authAdmin, AccommodationController.createAccommodations)
  .delete("/", AccommodationController.deleteAllAccommodations)
  .delete("/:id/", AccommodationController.deleteAccommodationById)
  .put("/:id", AccommodationController.updateAccommodation);

module.exports = accommodationRoutes;
