const { Router } = require("express");
const InterestController = require("../controllers/interest.controller");

const interestRoutes = Router();

interestRoutes
  .get("/", InterestController.getAllInterests)
  .post("/", InterestController.createInterest);

module.exports = interestRoutes;
