const { Router } = require("express");
const PlaceController = require("../controllers/place.controller");

const placeRoutes = Router();

placeRoutes
  .get("/", PlaceController.getAllPlaces)
  .get("/get/landmarks", PlaceController.getLandmarkPlaces)
  .post("/", PlaceController.createPlace)
  .post("/create/one", PlaceController.createOnePlace)
  .delete("/:name", PlaceController.deletePlace)
  .delete("/", PlaceController.deleteAllPlace)
  .put("/:id", PlaceController.updatePlace);

module.exports = placeRoutes;
