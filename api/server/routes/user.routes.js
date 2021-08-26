const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const TripController = require("../controllers/trip.controller");
const auth = require("../middleware/auth");

const userRoutes = Router();

userRoutes
  .get("/info", auth, UserController.getUserInfo)
  .get("/logout", UserController.logout)
  .get("/refresh_token", UserController.refreshToken)
  .post("/login", auth, UserController.login)
  .get("/trips", auth, TripController.getAllTripByUser)
  .post("/register", UserController.register)
  .post("/interests", auth, UserController.addInterest)
  .delete("/interests", auth, UserController.deleteInterest)
  .delete("/", auth, UserController.deleteAllUsers);

module.exports = userRoutes;
