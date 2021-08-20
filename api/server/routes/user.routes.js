const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth");

const userRoutes = Router();

userRoutes
  .get("/info", auth, UserController.getUser)
  .get("/logout", UserController.logout)
  .get("/refresh_token", UserController.refreshToken)
  .get("/trips", auth, UserController.getTripsByUser)
  .post("/login", UserController.login)
  .post("/register", UserController.register)
  .post("/interests", auth, UserController.addInterest)
  .delete("/interests", auth, UserController.deleteUserInterest)
  .delete("/", UserController.deleteAllUsers);

module.exports = userRoutes;
