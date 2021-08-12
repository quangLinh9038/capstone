const { Router } = require("express");
const PlaceController = require("../controllers/place.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const placeRoutes = Router();

placeRoutes
  .get("/", PlaceController.getAllPlaces)
  .get("/landmarks", PlaceController.getLandmarkPlaces)
  .post("/", auth, authAdmin, PlaceController.createPlace)
  .delete("/:id", PlaceController.deletePlaceById)
  .delete("/", PlaceController.deleteAllPlace)
  .put("/:id", PlaceController.updatePlace);

module.exports = placeRoutes;
