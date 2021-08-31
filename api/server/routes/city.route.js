const { Router } = require("express");
const CityController = require("../controllers/city.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const cityRoutes = Router();

cityRoutes.post("/",auth, authAdmin, CityController.createNewCities);

module.exports = cityRoutes;
