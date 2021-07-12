const AccommodationService = require("../service/accommodation.service");
const AccommodationNeo4j = require("../../neo4j/neo4j-api/accommodation.neo4j");
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
  getNearestAccommodations: async (req, res) => {
    try {
      // return here
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  createAccommodations: async (req, res) => {
    try {
      // check existed accoms
      const newAccomms = req.body;
      const existedAccommList = [];

      // check for each element of array accomms
      // whether existed accomm
      for (let i = 0; i < newAccomms.length; i += 1) {
        const checkedName = newAccomms[i].name;
        // eslint-disable-next-line no-await-in-loop
        const existAccomm = await AccommodationService.getOneAccommodation(checkedName);

        // push to existed list containing accommodation.name
        if (existAccomm) {
          existedAccommList.push(existAccomm.name);
        }
      }

      /**
       * if there is none of existed accomms
       * create new accomms
       * if not, return existed error messages
       */

      if (Array.isArray(existedAccommList) && !existedAccommList.length) {
        /**
         * Use sequelize create() method
         * to POST data of accomms to Postgres
        */
        await AccommodationService.createAccommodations(newAccomms);

        /**
         * Use neode to create nodes from JSON request
         * @param {props} properties of Accommodation nodes containing {name, lat, lng}
         *
         * forEach() objects in newAccomms list
         */
        await newAccomms.forEach((props) => AccommodationNeo4j.createAccomodation(props));

        // return results
        return res.status(200).json(newAccomms);
      }
      return res.status(400).send({
        message: `Accommodations [ ${existedAccommList} ] are existed`,
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

      return await AccommodationService.deleteAllAccommodations().then(() =>
        res.status(200).send({
          message: "Deleted all accommodations!",
        })
      );
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = AccommodationController;
