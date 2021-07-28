const routes = require("express").Router();
const placesRoute = require("./place.routes");
const accommodationsRoute = require("./accommodation.route");
const usersRoute = require("./user.routes");
const interestsRoute = require("./interest.routes");
const tripRoute = require("./trip.route");

routes.use("/places", placesRoute);
routes.use("/accommodations", accommodationsRoute);
routes.use("/trips", tripRoute);
routes.use("/users", usersRoute);
routes.use("/interests", interestsRoute);

routes.get("/", (req, res) => {
  res.status(200).json({ message: "API on air" });
});

module.exports = routes;
