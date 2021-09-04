const { Router } = require("express");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const CuisineController = require("../controllers/cuisine.controller");
const cuisineRoutes = Router();

cuisineRoutes
  .get("/", CuisineController.getAllCuisine)
  .get("/main", CuisineController.getMainCuisine)
  .post("/", auth, authAdmin, CuisineController.createCuisine)
  .delete("/:id", auth, authAdmin, CuisineController.deleteCuisineById)
  .delete("/", auth, authAdmin, CuisineController.deleteAllCuisine)
  .put("/:id", auth, authAdmin, CuisineController.updateCuisine);

module.exports = cuisineRoutes;
