const { Router } = require("express");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const CuisineController = require("../controllers/cuisine.controller");
const cuisineRoutes = Router();

cuisineRoutes
  .get("/", CuisineController.getAllCuisine)
  .post("/", CuisineController.createCuisine)
  .delete("/:id", CuisineController.deleteCuisineById)
  .delete("/", CuisineController.deleteAllCuisine)
  .put("/:id", CuisineController.updateCuisine);

module.exports = cuisineRoutes;
