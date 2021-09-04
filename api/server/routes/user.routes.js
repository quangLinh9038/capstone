const { Router } = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const UserController = require("../controllers/user.controller");

const userRoutes = Router();

userRoutes
  .get("/info", auth, UserController.getUserInfo)
  .get("/logout", UserController.logout)
  .get("/refresh_token", UserController.refreshToken)
  .post("/login", UserController.login)
  .post("/register", UserController.register)
  .post("/interests", auth, UserController.addInterest)
  .post("/interests/destroyer", auth, UserController.deleteInterest)
  .delete("/", auth, authAdmin, UserController.deleteAllUsers);

module.exports = userRoutes;
