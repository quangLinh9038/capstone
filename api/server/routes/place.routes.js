const { Router } = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const PlaceController = require("../controllers/place.controller");
const placeRoutes = Router();

placeRoutes
  .get("/", PlaceController.getAllPlaces)
  .get("/landmarks", PlaceController.getLandmarkPlaces)
  .post("/",auth, authAdmin, PlaceController.createPlace)
  .delete("/:id",auth, authAdmin, PlaceController.deletePlaceById)
  .delete("/",auth, authAdmin, PlaceController.deleteAllPlace)
  .put("/:id",auth, authAdmin, PlaceController.updatePlace);

module.exports = placeRoutes;
