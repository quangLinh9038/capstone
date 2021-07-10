const { Router } = require("express");
const PlaceController = require("../controllers/place.controller");

const placeRoutes = Router();

placeRoutes
  .get("/", PlaceController.getAllPlaces)
  .get("/mainPlaces", PlaceController.getLandmarkPlaces)
  .post("/", PlaceController.createPlace)
  .post("/addNeode", PlaceController.createPlaceInNeo4j)
  .delete("/:name", PlaceController.deletePlace)
  .delete("/", PlaceController.deleteAllPlace)
  .put("/:id", PlaceController.updatePlace);

module.exports = placeRoutes;
