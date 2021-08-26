const routes = require("express").Router();

/* 
  Import routers
*/
const placesRoute = require("./place.routes");
const accommodationsRoute = require("./accommodation.route");
const usersRoute = require("./user.routes");
const interestsRoute = require("./interest.routes");
const tripRoute = require("./trip.route");
const cuisineRoutes = require("./cuisine.route");
const itineraryRoutes = require("./itinerary.route");
const cityRoutes = require("./city.route");

routes.use("/places", placesRoute);
routes.use("/accommodations", accommodationsRoute);
routes.use("/trips", tripRoute);
routes.use("/users", usersRoute);
routes.use("/interests", interestsRoute);
routes.use("/cuisines", cuisineRoutes);
routes.use("/itineraries", itineraryRoutes);
routes.use("/cities", cityRoutes);

routes.get("/", (req, res) => {
  res.status(200).json({ message: "API is ready" });
});

module.exports = routes;
