/* Import services */
const ItineraryService = require("../service/itinerary.service");
const ItineraryNeo4jService = require("../../neo4j/service/itinerary.neo4j.service");

const ItineraryController = {
  getAnItinerary: async (req, res) => {
    try {
      /* Get params */
      //   const title = req.body;

      const placeParams = req.query.places;
      const placeLimit = req.query.placeLimit;

      const accommodationParams = req.query.accommodations;
      const accommodationLimit = req.query.accommodationLimit;

      const cuisineParams = req.query.cuisines;
      const cuisineLimit = req.query.cuisineLimit;

      console.log(
        "🚀 ~ file: itinerary.controller.js ~ line 21 ~ getAnItinerary: ~ cuisineParams",
        cuisineParams
      );
      /* Check missing params */
      if (
        !placeParams.length &&
        !placeLimit &&
        !accommodationParams.length &&
        !accommodationLimit &&
        !cuisineParams.length &&
        !cuisineLimit
      ) {
        return res
          .status(400)
          .json({ status: "failure", message: "Missing params" });
      }

      const firstPlaceAndShortestAccommodation =
        await ItineraryService.getFirstPlaceAndShortestAccommodation(
          placeParams,
          placeLimit,
          accommodationParams,
          accommodationLimit
        );

      console.log(
        "🚀 ~ file: itinerary.controller.js ~ line 43 ~ getAnItinerary: ~ firstPlaceAndShortestAccommodation",
        firstPlaceAndShortestAccommodation
      );
      const shortestAccommodationFromFirstPlace =
        firstPlaceAndShortestAccommodation[1];
      console.log(
        "🚀 ~ file: itinerary.controller.js ~ line 49 ~ getAnItinerary: ~ shortestAccommodationFromFirstPlace",
        shortestAccommodationFromFirstPlace
      );

      const shortestLunchCuisineFromAccommodation =
        await ItineraryService.getShortestLunchCuisine(
          shortestAccommodationFromFirstPlace,
          cuisineParams,
          cuisineLimit
        );

      console.log(
        "🚀 ~ file: itinerary.controller.js ~ line 61 ~ getAnItinerary: ~ shortestLunchCuisineFromAccommodation",
        shortestLunchCuisineFromAccommodation
      );

      return shortestLunchCuisineFromAccommodation
        ? res.status(200).json({
            status: "success",
            data: { shortestLunchCuisineFromAccommodation },
          })
        : res
            .status(404)
            .json({ status: "failure", message: "Not found lunch" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createNewItinerary: async (req, res) => {},
};

module.exports = ItineraryController;
