const AccommodationService = require("../service/accommodation.service");
const AccommodationNeo4jService = require("../../neo4j/service/accommodation.neo4j.service");

/***
 * Import utils
 */
const parseString = require("../utils/parseString");

const AccommodationController = {
  // get all accommodations
  getAllAccommodations: async (req, res) => {
    try {
      const allAccommodations =
        await AccommodationService.getAllAccommodations();

      return res.status(200).json(allAccommodations);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  // get matched accommodations with user's interests
  getMainAccommodation: async (req, res) => {
    try {
      const { param1 } = req.query;
      const paramList = [param1];
      console.log(paramList);

      const mainAccommodation = await AccommodationService.getMainAccommodation(
        paramList
      );

      return res.send(mainAccommodation);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  createAccommodations: async (req, res) => {
    try {
      // check existed accomms
      const newAccomms = req.body;
      const existedAccommsList = [];

      // check for each element of array accomms
      // whether existed accomms
      for (let i = 0; i < newAccomms.length; i += 1) {
        const checkedName = newAccomms[i].name;

        const existAccomms = await AccommodationService.getOneAccommodation(
          checkedName
        );

        // push to existed list containing accommodation.name
        if (existAccomms) {
          existedAccommsList.push(existAccomms.name);
        }
      }

      /**
       * if there is none of existed accomms
       * create new accomms
       * if not, return existed error messages
       */

      if (Array.isArray(existedAccommsList) && !existedAccommsList.length) {
        /**
         * Use sequelize create() method
         * to POST data of accomms to Postgres
         */
        const _newAccomms = await AccommodationService.createAccommodations(
          newAccomms
        );

        /**
         * Parsing _newAccomms as Object
         */
        const objNewAccomms = parseString(_newAccomms);
        /**
         * Use neode to create nodes from JSON request
         * @param {props} properties of Accommodation nodes containing {name, lat, lng}
         * forEach() objects in newAccomms list
         */

        await objNewAccomms.forEach((props) =>
          AccommodationNeo4jService.createAccommodation(props)
        );

        // return results
        return res.status(201).json(newAccomms);
      }
      return res.status(400).send({
        message: `Accommodations [ ${existedAccommsList} ] are existed`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteAllAccommodations: async (req, res) => {
    try {
      const accommodations = await AccommodationService.getAllAccommodations();

      if (!accommodations.length) {
        return res.status(400).send({
          message: "Empty list!",
        });
      }
      /**
       * Postgres DELETE
       */
      await AccommodationService.deleteAllAccommodations();

      await AccommodationNeo4jService.deleteAllAccomms();

      return res.status(200).send({
        message: "Deleted all accommodations!",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  deleteAccommsOnNeo4j: async (req, res) => {
    try {
      await AccommodationNeo4jService.deleteAllAccomms();

      return res.status(200).json({ msg: "Delete all on Neo4j db" });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = AccommodationController;
