const AccommodationService = require("../service/accommodation.service");
const AccommodationNeo4jService = require("../../neo4j/service/accommodation.neo4j.service");
const { Op } = require("sequelize");
/***
 * Import utils
 */
const parsingStringToObject = require("../utils/parsingStringToObject");

const AccommodationController = {
  getAllAccommodations: async (req, res) => {
    try {
      /**
       * Get params
       */
      const {
        name,
        is3stars,
        is4stars,
        is5stars,
        isHomestay,
        hasKitchen,
        hasBreakfast,
        hasFreeCancel,
        hasNoPrepayment,
      } = req.query;

      /***
       * Define conditions for query
       */
      var nameOption = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
      var is3starsOption = is3stars ? { is3stars: { [Op.eq]: 1 } } : null;
      var is4starsOption = is4stars ? { is4stars: { [Op.eq]: 1 } } : null;
      var is5starsOption = is5stars ? { is5stars: { [Op.eq]: 1 } } : null;
      var isHomestayOption = isHomestay ? { isHomestay: { [Op.eq]: 1 } } : null;
      var hasKitchenOption = hasKitchen ? { hasKitchen: { [Op.eq]: 1 } } : null;
      var hasBreakfastOption = hasBreakfast
        ? { hasBreakfast: { [Op.eq]: 1 } }
        : null;
      var hasFreeCancelOption = hasFreeCancel
        ? { hasFreeCancel: { [Op.eq]: 1 } }
        : null;
      var hasNoPrepaymentOption = hasNoPrepayment
        ? { hasNoPrepayment: { [Op.eq]: 1 } }
        : null;

      const conditionList = [
        nameOption,
        is3starsOption,
        is4starsOption,
        is5starsOption,
        isHomestayOption,
        hasKitchenOption,
        hasBreakfastOption,
        hasFreeCancelOption,
        hasNoPrepaymentOption,
      ];

      /***
       * Set statement of condition is null
       * to check every object whether null or not
       */
      const isEveryObjectNull = (condition) => condition === null;

      /**
       * If conditionList has one ore more conditions --> query conditional Accoms
       *
       * If not, query all Accoms from db
       */
      if (!conditionList.every(isEveryObjectNull)) {
        const conditionalAccommodation =
          await AccommodationService.getConditionalAccoms(conditionList);

        /**
         * Check found Accommodation
         * */
        return !conditionalAccommodation.length
          ? res
              .status(404)
              .json({ status: "failure", message: `Accommodations not found` })
          : res.json({
              status: "success",
              result: conditionalAccommodation.length,
              data: conditionalAccommodation,
            });
      }
      /**
       * If conditions are every null
       * return GET all accoms routes
       */
      const allAccommodations =
        await AccommodationService.getAllAccommodations();

      return !allAccommodations.length
        ? res.status(404).json({
            status: "failure",
            message: "Accommodations are empty",
          })
        : res.status(200).json({
            status: "success",
            result: allAccommodations.length,
            data: allAccommodations,
          });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  // get matched accommodations with user's interests
  getMainAccommodation: async (req, res) => {
    try {
      const allAccommodations =
        await AccommodationService.getAllAccommodations();

      if (!allAccommodations.length) {
        return res.status(404).json({
          status: "failure",
          message: "Accommodations are empty!",
        });
      }

      const { param1 } = req.query;
      const limit = req.query.limit;

      if (!param1 || !limit) {
        return res
          .status(400)
          .json({ status: "failure", message: "Missing params" });
      }
      const paramList = [param1];

      const mainAccommodation = await AccommodationService.getMainAccommodation(
        paramList,
        limit
      );

      return mainAccommodation.length
        ? res.status(200).json({
            status: "success",
            results: mainAccommodation.length,
            data: mainAccommodation,
          })
        : res.status(404).json({
            status: "failure",
            message: "Main Accommodation not found!",
          });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  createAccommodations: async (req, res) => {
    try {
      const newAccommodations = req.body;

      const existedAccommodationList = [];

      if (!newAccommodations.length)
        return res
          .status(400)
          .json({ status: "failure", message: "Missing request body" });
      /*  
      Check for each element of Places
      whether existed one
      */
      for (const accommodation of newAccommodations) {
        const existedAccommodation =
          await AccommodationService.getOneAccommodationByName(
            accommodation.name
          );
        if (existedAccommodation) {
          existedAccommodationList.push(existedAccommodation.name);
        }
      }

      /**
       * if there is none of existed accomms
       * create new accomms
       * if not, return existed error messages
       */

      if (
        Array.isArray(existedAccommodationList) &&
        !existedAccommodationList.length
      ) {
        /**
         * Use sequelize create() method
         * to POST data of accomms to Postgresql
         */
        const _newAccommodation =
          await AccommodationService.createAccommodations(newAccommodations);

        // console.log(
        //   "🚀 ~ file: accommodation.controller.js ~ line 119 ~ createAccommodations: ~ _newAccommodation",
        //   _newAccommodation
        // );
        /**
         * Parsing _newAccomms as Object
         */
        const objNewAccommodation = parsingStringToObject(_newAccommodation);

        /**
         * Use neode to create nodes from JSON request
         * @param {props} properties of Accommodation nodes containing {name, lat, lng}
         * forEach() objects in newAccommodations list
         */

        await objNewAccommodation.forEach((props) =>
          AccommodationNeo4jService.createAccommodation(props)
        );

        await AccommodationNeo4jService.initRelationshipToCuisine();

        return res.status(201).json({
          status: "success",
          results: _newAccommodation.length,
          data: _newAccommodation,
        });
      }
      return res.status(400).send({
        status: "failure",
        message: `Accommodations [ ${existedAccommodationList} ] are existed`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteAccommodationById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id)
        return res
          .status(404)
          .json({ status: "failure", message: "Missing params" });

      const accommodationToDelete =
        await AccommodationService.getOneAccommodationById(id);

      if (accommodationToDelete) {
        await AccommodationService.deleteAccommodationById(id);
        await AccommodationNeo4jService.deleteOneAccommodationNode(
          accommodationToDelete.unique_point
        );
        return res.status(200).json({
          status: "success",
          message: `Accommodation with ${id} deleted successfully`,
        });
      }
      return res.status(404).json({
        status: "failure",
        message: `Accommodation with ${id} not found`,
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteAllAccommodations: async (req, res) => {
    try {
      const accommodations = await AccommodationService.getAllAccommodations();

      if (!accommodations.length) {
        return res.status(404).send({
          message: "Empty list!",
        });
      }

      await AccommodationService.deleteAllAccommodations();

      await AccommodationNeo4jService.deleteAllAccommodations();

      return res.status(200).send({
        message: "Deleted all accommodations!",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  async updateAccommodation(req, res) {
    try {
      const updateAccommodation = req.body;
      const { id } = req.params;

      if (!updateAccommodation || !id)
        return res.status(400).json({
          status: "failure",
          message: "Missing params or request body",
        });

      const accommodationToUpdate =
        await AccommodationService.getOneAccommodationById(id);
      const unique_point = accommodationToUpdate.unique_point;

      if (accommodationToUpdate) {
        await AccommodationService.updateAccommodation(id, updateAccommodation);
        await AccommodationNeo4jService.updateAccommodation(
          unique_point,
          updateAccommodation
        );
        return res.status(200).send({
          status: "success",
          message: `Place with ${id} is updated successfully`,
        });
      }

      return res.status(404).send({
        status: "failure",
        message: `Place with ${id} not found!`,
      });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  },
};

module.exports = AccommodationController;
