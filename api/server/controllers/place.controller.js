const PlaceNeo4jService = require("../neo4j/api/place.api");
const PlaceNeo4j = require("../neo4j/api/place.api");
const PlaceService = require("../service/place.service");
// const { Op } = db.Sequelize.Op;

const PlaceController = {
  // get all Places
  getAllPlaces: async (req, res) => {
    try {
      const allPlaces = await PlaceService.getAllPlaces();

      // check empty list
      if (allPlaces === null) {
        return res.status(204).send({
          message: "Places are empty!",
        });
      }
      // response list of places
      return res.status(200).json(allPlaces);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get landmark places matched with user's interests
  getLandmarkPlaces: async (req, res) => {
    try {
      // get query params
      const { param1, param2, param3 } = req.query;

      // mapping params as a sub-query string
      const paramList = [param1, param2, param3];

      // sequelize service
      const landmarkPlaces = await PlaceService.getLandmarkPlaces(paramList);

      // check unique_point
      // neode service
      const point = landmarkPlaces[0].unique_point;
      const _point = `"${point}"`;

      await PlaceNeo4jService.getMainPlaces(_point);
      console.log(_point);

      // for (let i = 0; i < landmarkPlaces.length; i++) {
      //   const checkedPoint = landmarkPlaces[i].unique_point;

      //   const unique_point = `"${checkedPoint}"`;
      //   console.log(unique_point);
      //   await PlaceNeo4jService.getMainPlaces(unique_point);
      // }

      return res.send(landmarkPlaces);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // create new places
  createPlace: async (req, res) => {
    try {
      const newPlaces = req.body;
      const existedPlaceList = [];

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
       * if there is none of existed places
       * create new places
       * if not, return existed error messages
       */

      if (Array.isArray(existedPlaceList) && !existedPlaceList.length) {
        /**
         * Use sequelize create() method
         * to POST data of places to Postgres
         */
        await PlaceService.createPlaces(newPlaces);

        /**
         * Use neode to create nodes from JSON request
         * @param {props} properties of Place nodes containing {name, lat, lng}
         *
         * forEach() objects in newPlaces list
         */

        await newPlaces.forEach((props) => PlaceNeo4j.createPlace(props));

        // return results
        return res.status(201).send(newPlaces);
      }
      return res.status(400).send({
        message: `Places [ ${existedPlaceList} ] are existed`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createOnePlace: async (req, res) => {
    try {
      const newPlace = req.body;

      const _newPLace = await PlaceService.createOnePlace(newPlace);

      return res.status(201).send(_newPLace);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
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
      await PlaceNeo4j.deletePlaces();

      return res.status(200).json({
        message: "Deleted all places!",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = PlaceController;
