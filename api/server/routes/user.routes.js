const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth");

const userRoutes = Router();

userRoutes
  .get("/info", auth, UserController.getUser)
  .get("/logout", UserController.logout)
  .post("/login", UserController.login)
  .post("/register", UserController.register)
  .get("/refresh_token", UserController.refreshToken)
  .post("/interests", auth, UserController.addInterest)
  .delete("/interests", auth, UserController.deleteInterest)
  .delete("/", UserController.deleteAllUsers);

module.exports = userRoutes;
