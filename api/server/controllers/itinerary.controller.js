/* Import services */
const ItineraryService = require("../service/itinerary.service");

const PlaceService = require("../service/place.service");
const AccommodationService = require("../service/accommodation.service");
const CuisineService = require("../service/cuisine.service");

const ItineraryController = {
  getOneItinerary: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ status: "failure", message: "Missing params {id}" });
      }

      const itinerary = await ItineraryService.getOneItineraryById(id);

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

      const accommodationParams = req.query.accommodations;
      const accommodationLimit = req.query.accommodationLimit;
      const accommodationPrice = req.query.accommodationPrice;

      const cuisineParams = req.query.cuisines;
      const cuisineLimit = req.query.cuisineLimit;

      /* 
        Init totalPrice default value 
      */
      var totalPrice = 0;

      /* Check missing params */
      if (
        !placeParams.length &&
        !placeLimit &&
        !accommodationParams.length &&
        !accommodationPrice &&
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
          accommodationPrice,
          accommodationLimit
        );

      if (!firstPlaceAndShortestAccommodation.length) {
        return res.status(404).json({
          status: "failure",
          message: "Not found accommodation for queried price",
        });
      }
      /*  
        Get shortest Accommodation from queried results above
        Accommodation {unique_point} is placed at 2nd position of records
      */
      const shortestAccommodationFromFirstPlace =
        firstPlaceAndShortestAccommodation[1];

      /* 
        Get the shortest lunch cuisine from resulted Accommodation
      */
      const shortestLunchCuisineFromAccommodationList =
        await ItineraryService.getShortestLunchCuisine(
          shortestAccommodationFromFirstPlace,
          cuisineParams,
          cuisineLimit
        );

      const shortestLunchCuisine = shortestLunchCuisineFromAccommodationList[0];

      /* 
        Get list of Places with the first one is the shortest from lunch Cuisine
      */
      const duplicatePlace = firstPlaceAndShortestAccommodation[0];

      const mainPlacesForOneItinerary = await ItineraryService.getMainPlaces(
        placeParams,
        placeLimit,
        shortestLunchCuisine,
        duplicatePlace
      );

      const penultimatePlace = mainPlacesForOneItinerary.slice(-3)[0];

      /* 
        Get the shortest dinner Cuisine from the penultimate Places of above list
      */
      const shortestDinnerCuisine =
        await ItineraryService.getShortestDinnerCuisine(
          cuisineParams,
          cuisineLimit,
          penultimatePlace
        );

      /*
        Summarizing items of an Itinerary 
      */
      const places = [
        ...[firstPlaceAndShortestAccommodation[0]],
        ...mainPlacesForOneItinerary,
      ];

      const accommodations = [firstPlaceAndShortestAccommodation[1]];

      const cuisines = [
        ...shortestLunchCuisineFromAccommodationList,
        ...shortestDinnerCuisine,
      ];

      if ((!places.length, !accommodations.length, !cuisines.length)) {
        return res.status(404).json({
          status: "Not Found",
          data: {
            placeResults: places.length,
            accommodationResult: accommodations.length,
            cuisineResult: cuisines.length,
          },
        });
      }
      /* 
        Get price of Places 
      */
      for (const place of places) {
        const _place = await PlaceService.getPlaceByUniquePoint(place);
        totalPrice += _place.price;
      }

      /* 
        Get price of Accommodations
      */
      for (const accommodation of accommodations) {
        const _accommodation =
          await AccommodationService.getOneAccommodationByUniquePoint(
            accommodation
          );
        // accommodation price calculated according to number of traveling days
        totalPrice += _accommodation.price * (cuisines.length / 2);
      }

      /* 
        Get price of Cuisines 
      */
      for (const cuisine of cuisines) {
        const _cuisine = await CuisineService.getOneCuisineByUniquePoint(
          cuisine
        );
        totalPrice += _cuisine.price;
      }

      return shortestDinnerCuisine
        ? res.status(200).json({
            status: "success",
            data: {
              totalPrice: totalPrice,
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

      const places = req.body.places;
      const accommodations = req.body.accommodations;
      const cuisines = req.body.cuisines;

      var numberOfItems =
        places.length + accommodations.length + cuisines.length;

      if (!title.length) {
        return res
          .status(400)
          .json({ status: "failure", message: "Missing request body" });
      }

      const _newItinerary = await ItineraryService.createOneItinerary({
        title: title,
        numberOfItems: numberOfItems,
      });

      /* 
        Add one Accommodation
        
        Not working with several Accommodations
      */
      const _accommodation =
        await AccommodationService.getOneAccommodationByUniquePoint(
          accommodations
        );

      await _newItinerary.addAccommodation(_accommodation);

      /* 
        Add list of Places 
      */
      for (const place of places) {
        const _place = await PlaceService.getPlaceByUniquePoint(place);
        // console.log(
        //   "🚀 ~ file: itinerary.controller.js ~ line 189 ~ places.forEach ~ _place",
        //   _place
        // );
        await _newItinerary.addPlace(_place);
      }

      /*
        Add Cuisines 
      */
      for (const cuisine of cuisines) {
        const _cuisine = await CuisineService.getOneCuisineByUniquePoint(
          cuisine
        );
        await _newItinerary.addCuisine(_cuisine);
      }

      return _newItinerary
        ? res.status(201).json({ status: "success", data: _newItinerary })
        : res.status(400).json({ status: "failure" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ItineraryController;
