const { QueryTypes } = require('sequelize');
const db = require('../models');
console.log('DATABASE');
console.log(db);
// const Op = db.Sequelize.Op;

const PlaceController = {
  // get all Places
  getAllPlaces: async (req, res) => {
    try {
      const allPlaces = await db.places.
      // check empty list
      if (allPlaces == null) {
        return res.status(204).send({
          message: 'Places are empty!',
        });
      }

      // response list of places
      return res.status(200).json(allPlaces);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get main places
  getMainPlace: async (req, res) => {
    try {
      // get user params
      const { param1, param2 } = req.query;

      // mapping params as a sub-query string
      const list = [param1, param2];
      const subQuery = list.map((item) => `"${item}"`).join('+');
      console.log(subQuery);

      const sql = `SELECT *, ${subQuery} AS point
            FROM "Places"
            ORDER BY point DESC LIMIT 5;`;

      const mainPlaces = await db.sequelize.query(sql, {
        type: QueryTypes.SELECT,
      });

      return res.send(mainPlaces);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // create new places
  createPlace: async (req, res) => {
    try {
      // check existed places
      const newPlaces = req.body;
      const existedPlaceList = [];

      // check for each element of array places
      // whether existed place
      for (let i = 0; i < newPlaces.length; i += 1) {
        const checkedName = newPlaces[i].name;

        // eslint-disable-next-line no-await-in-loop
        const existPlace = await Place.findOne({
          where: { name: checkedName },
        });

        // push to existed list
        if (existPlace) {
          existedPlaceList.push(existPlace.name);
        }
      }

      // if there is none of existed places
      // create new places
      // if not, return existed error messages
      if (Array.isArray(existedPlaceList) && !existedPlaceList.length) {
        // create list of places
        await Place.bulkCreate(newPlaces).then((data) => res.status(201).send(data));
      }

      console.log(newPlaces);
      // INSERT query to Neo4j
      // IMPORT json
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
    try {
      const { name } = req.params;

      await Place.destroy({
        where: { name },
      }).then((num) => {
        if (num === 1) {
          return res.send({
            message: 'Deleted',
          });
        }
        return res.send({
          message: `Error with ${name}`,
        });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // update places
  // eslint-disable-next-line consistent-return
  async updatePlace(req, res) {
    try {
      const { id } = req.params;
      await Place.update(req.body, {
        where: { id },
      }).then((num) => {
        if (num === 1) {
          return res.send({
            message: 'Place was updated successfully.',
          });
        }
        return res.send({
          message: `Cannot update Place with id=${id}. Maybe Place was not found or empty!`,
        });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = PlaceController;
