/**
 * Import services
 */
const PlaceNeo4jService = require("../../neo4j/service/place.neo4j.service");
const PlaceService = require("../service/place.service");
const { Op } = require("sequelize");

/***
 * Import utils
 */
const parseString = require("../utils/parseString");

const PlaceController = {
  // get all Places
  getAllPlaces: async (req, res) => {
    try {
      /**
       * Get params
       */
      const {
        name,
        isHistorical,
        isUrban,
        isReligious,
        isMuseum,
        isShopping,
        isPark,
        isAdventure,
        isNature,
      } = req.query;

      /***
       * Define conditions for query
       */
      var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
      var condition1 = isHistorical ? { isHistorical: { [Op.eq]: 1 } } : null;
      var condition2 = isUrban ? { isUrban: { [Op.eq]: 1 } } : null;
      var condition3 = isReligious ? { isReligious: { [Op.eq]: 1 } } : null;
      var condition4 = isMuseum ? { isMuseum: { [Op.eq]: 1 } } : null;
      var condition5 = isShopping ? { isShopping: { [Op.eq]: 1 } } : null;
      var condition6 = isAdventure ? { isAdventure: { [Op.eq]: 1 } } : null;
      var condition7 = isNature ? { isNature: { [Op.eq]: 1 } } : null;
      var condition8 = isPark ? { isPark: { [Op.eq]: 1 } } : null;

      const conditionList = [
        condition,
        condition1,
        condition2,
        condition3,
        condition4,
        condition5,
        condition6,
        condition7,
        condition8,
      ];

      /***
       * set statement of condition is null
       * to check every object whether null or not
       */
      const isEveryObjectNull = (condition) => condition === null;

      /**
       * If conditionList has one ore more conditions --> query conditional Places
       *
       * If not, query all Places from db
       */
      if (!conditionList.every(isEveryObjectNull)) {
        const conditionalPlaces = await PlaceService.getConditionalPlaces(
          conditionList
        );

        /**
         * Check found Places
         * */
        if (conditionalPlaces.length === 0)
          return res.status(404).send({ message: `Places not found` });
        /**
         * If not null
         * response matched conditional Places
         */
        return res.json({
          status: "success",
          result: conditionalPlaces.length,
          allPlaces: conditionalPlaces,
        });
      }
      /**
       * If conditions are every null
       * return GET all places routes
       */
      const allPlaces = await PlaceService.getAllPlaces();

      if (allPlaces.length.length === 0)
        return res.status(204).send({ message: `Places are empty` });

      return res.json({
        status: "success",
        result: allPlaces.length,
        allPlaces: allPlaces,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // get landmark places matched with user's interests
  getLandmarkPlaces: async (req, res) => {
    try {
      const places = await PlaceService.getAllPlaces();

      if (places.length === 0) {
        return res.status(404).json({ message: "Places are empty" });
      } else {
        // get query params
        const { param1, param2, param3 } = req.query;
        const limit = req.query.limit;

        // mapping params as a sub-query string
        const paramList = [param1, param2, param3];

        /**
         * Use PlaceService.getLandmarkPlaces
         * to query interested Places from Postgres
         */
        const landmarkPlaces = await PlaceService.getLandmarkPlaces(
          paramList,
          limit
        );

        return res.status(200).json(landmarkPlaces);
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // create new places
  createPlace: async (req, res) => {
    try {
      const newPlaces = req.body;
      let existedPlaceList = [];

      // check for each element of array places
      // whether existed place
      for (let i = 0; i < newPlaces.length; i += 1) {
        const checkedName = newPlaces[i].name;

        // eslint-disable-next-line no-await-in-loop
        const existPlace = await PlaceService.getOnePlace(checkedName);

        // push to existed list containing place.name
        if (existPlace) {
          existedPlaceList.push(existPlace.name);
        }
      }

      /**
       * If there is none of existed places
       * create new places
       * If not, return existed error messages
       */

      if (Array.isArray(existedPlaceList) && !existedPlaceList.length) {
        /**
         * Use sequelize create() method
         * to POST data of places to Postgres
         */
        const _newPlaces = await PlaceService.createPlaces(newPlaces);

        /**
         * Parsing _newPlaces to Object to post to Neo4j
         */
        const objNewPlaces = parseString(_newPlaces);

        /**
         * Use neode to create nodes from JSON request
         * @param {props} properties of Place nodes containing {name, lat, lng, unique_point}
         *
         * forEach() objects in newPlaces list
         */
        await objNewPlaces.forEach((props) =>
          PlaceNeo4jService.createPlace(props)
        );

        await PlaceNeo4jService.initRelationship();

        // return results
        return res.status(201).json({
          msg: "Place created",
          results: _newPlaces.length,
          newPlaces: _newPlaces,
        });
      }
      return res.status(400).send({
        message: `Places [ ${existedPlaceList} ] are existed`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // delete places
  // eslint-disable-next-line consistent-return
  async deletePlace(req, res) {
    const { name } = req.params;

    try {
      const placeToDelete = await PlaceService.deletePlace(name);

      if (placeToDelete) {
        return res.status(200).send({
          message: `Place: ${name} has been deleted successfully`,
        });
      }
      return res.status(404).send({
        message: `Place: ${name} not found`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // update places
  // eslint-disable-next-line consistent-return
  async updatePlace(req, res) {
    const updatePlace = req.body;
    const { id } = req.params;

    try {
      const placeToUpdate = await PlaceService.updatePlace(id, updatePlace);

      if (!placeToUpdate) {
        return res.status(404).send({ message: `Place with ${id} not found!` });
      }
      return res
        .status(200)
        .send({ message: `Place with ${id} is updated successfully` });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  },

  deleteAllPlace: async (req, res) => {
    try {
      const placesToDelete = await PlaceService.getAllPlaces();

      if (!placesToDelete.length) {
        return res.status(400).send({
          message: "Empty list!",
        });
      }
      // delete in Postgres
      await PlaceService.deleteAllPlaces();

      // delete all in Neo4j
      await PlaceNeo4jService.deletePlaces();

      return res.status(200).json({
        message: "Deleted all places!",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = PlaceController;
