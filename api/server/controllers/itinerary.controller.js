/* Import services */
const ItineraryService = require("../service/itinerary.service");

const PlaceService = require("../service/place.service");
const AccommodationService = require("../service/accommodation.service");
const CuisineService = require("../service/cuisine.service");

const ItineraryController = {
  getOneItinerary: async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 13 ~ getOneItinerary: ~ id",
      // id
      // );

      if (!id) {
        return res
          .status(400)
          .json({ status: "failure", message: "Missing params {id}" });
      }

      const itinerary = await ItineraryService.getOneItineraryById(id);
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 25 ~ getOneItinerary: ~ itinerary",
      // itinerary
      // );

      return itinerary
        ? res.status(200).json({ status: "success", data: itinerary })
        : res
            .status(404)
            .json({ status: "failure", message: "Itinerary not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "failure", message: error.message });
    }
  },
  getAnItinerary: async (req, res) => {
    try {
      /* Get params */
      const placeParams = req.query.places;
      const placeLimit = req.query.placeLimit;
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 16 ~ getAnItinerary: ~ placeParams",
      // placeParams
      // );

      const accommodationParams = req.query.accommodations;
      const accommodationLimit = req.query.accommodationLimit;
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 23 ~ getAnItinerary: ~ accommodationParams",
      // accommodationParams
      // );

      const cuisineParams = req.query.cuisines;
      const cuisineLimit = req.query.cuisineLimit;

      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 31 ~ getAnItinerary: ~ cuisineParams",
      // cuisineParams
      // );

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

      /* 
        Get first Place and the shortest Accommodation from this Place 
      */
      const firstPlaceAndShortestAccommodation =
        await ItineraryService.getFirstPlaceAndShortestAccommodation(
          placeParams,
          placeLimit,
          accommodationParams,
          accommodationLimit
        );
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 43 ~ getAnItinerary: ~ firstPlaceAndShortestAccommodation",
      // firstPlaceAndShortestAccommodation
      // );

      /*  
        Get shortest Accommodation from queried results above
        Accommodation {unique_point} is placed at 2nd position of records
      */
      const shortestAccommodationFromFirstPlace =
        firstPlaceAndShortestAccommodation[1];
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 49 ~ getAnItinerary: ~ shortestAccommodationFromFirstPlace",
      // shortestAccommodationFromFirstPlace
      // );

      /* 
        Get the shortest lunch cuisine from resulted Accommodation
      */
      const shortestLunchCuisineFromAccommodation =
        await ItineraryService.getShortestLunchCuisine(
          shortestAccommodationFromFirstPlace,
          cuisineParams,
          cuisineLimit
        );

      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 61 ~ getAnItinerary: ~ shortestLunchCuisineFromAccommodation",
      // shortestLunchCuisineFromAccommodation
      // );

      /* 
        Get list of Places with the first one is the shortest from lunch Cuisine
      */
      const mainPlacesForOneItinerary = await ItineraryService.getMainPlaces(
        placeParams,
        placeLimit,
        shortestLunchCuisineFromAccommodation
      );
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 74 ~ getAnItinerary: ~ mainPlacesForOneItinerary",
      // mainPlacesForOneItinerary
      // );

      const penultimatePlace = mainPlacesForOneItinerary.slice(-3)[0];
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 89 ~ getAnItinerary: ~ penultimatePlace",
      // penultimatePlace
      // );

      /* 
        Get the shortest dinner Cuisine from the penultimate Places of above list
      */
      const shortestDinnerCuisine =
        await ItineraryService.getShortestDinnerCuisine(
          cuisineParams,
          cuisineLimit,
          penultimatePlace
        );

      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 143 ~ getAnItinerary: ~ shortestDinnerCuisine",
      // shortestDinnerCuisine
      // );
      /*
        Summarizing items of an Itinerary 
      */
      const places = [firstPlaceAndShortestAccommodation[0]].concat(
        mainPlacesForOneItinerary
      );
      const accommodations = [firstPlaceAndShortestAccommodation[1]];
      const cuisines = [
        shortestLunchCuisineFromAccommodation,
        shortestDinnerCuisine,
      ];

      return shortestDinnerCuisine
        ? res.status(200).json({
            status: "success",
            data: {
              accommodations: accommodations,
              cuisines: cuisines,

              places: places,
            },
          })
        : res
            .status(404)
            .json({ status: "failure", message: "Not found lunch" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createNewItinerary: async (req, res) => {
    try {
      const title = req.body.title;
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 151 ~ createNewItinerary: ~ newItinerary",
      // title
      // );

      const places = req.body.places;
      const accommodations = req.body.accommodations;
      const cuisines = req.body.cuisines;

      var numberOfItems =
        places.length + accommodations.length + cuisines.length;
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 144 ~ createNewItinerary: ~ accommodations",
      // accommodations
      // );
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 142 ~ createNewItinerary: ~ places",
      // places
      // );
      // console.log(
      // "🚀 ~ file: itinerary.controller.js ~ line 146 ~ createNewItinerary: ~ cuisines",
      // cuisines
      // );

      if (!title.length) {
        return res
          .status(400)
          .json({ status: "failure", message: "Missing request body" });
      }

      const _newItinerary = await ItineraryService.createOneItinerary({
        title: title,
        numberOfItems: numberOfItems,
      });
      console.log(
        "🚀 ~ file: itinerary.controller.js ~ line 183 ~ createNewItinerary: ~ _newItinerary",
        typeof _newItinerary
      );

      /* 
        Add one Accommodation
        
        Not working with several Accommodations
      */
      const _accommodation =
        await AccommodationService.getOneAccommodationByUniquePoint(
          accommodations
        );

      console.log(
        "🚀 ~ file: itinerary.controller.js ~ line 197 ~ accommodations.forEach ~ _accommodation",
        _accommodation
      );

      await _newItinerary.addAccommodation(_accommodation);

      /* 
        Add list of Places 
      */
      for (const place of places) {
        const _place = await PlaceService.getPlaceByUniquePoint(place);
        console.log(
          "🚀 ~ file: itinerary.controller.js ~ line 189 ~ places.forEach ~ _place",
          _place
        );
        await _newItinerary.addPlace(_place);
      }

      /*
        Add Cuisines 
      */
      for (const cuisine of cuisines) {
        const _cuisine = await CuisineService.getOneCuisineByUniquePoint(
          cuisine
        );
        console.log(
          "🚀 ~ file: itinerary.controller.js ~ line 215 ~ cuisines.forEach ~ _cuisine",
          _cuisine
        );
        await _newItinerary.addCuisine(_cuisine);
      }

      console.log(
        "🚀 ~ file: itinerary.controller.js ~ line 155 ~ createNewItinerary: ~ _newItinerary",
        _newItinerary
      );

      return _newItinerary
        ? res.status(201).json({ status: "success", data: _newItinerary })
        : res.status(400).json({ status: "failure" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ItineraryController;
