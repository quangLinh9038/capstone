const { QueryTypes } = require("sequelize");
const db = require("../src/models");
const { Op } = require("sequelize");

const { Place } = db;
const { City } = db;

const PlaceService = {
  // get all places
  getAllPlaces: async () => {
    try {
      return await Place.findAll({
        includes: [
          {
            model: City,
            as: "city",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  getConditionalPlaces: async (conditions) => {
    try {
      return await Place.findAll({
        where: {
          [Op.or]: [conditions],
        },
      });
    } catch (error) {
      return error;
    }
  },

  // get a place by name
  getOnePlace: async (checkedName) => {
    try {
      return await Place.findOne({
        where: { name: checkedName },
      });
    } catch (error) {
      return error;
    }
  },

  // create a list of places
  createPlaces: async (newPlaces) => {
    try {
      return await Place.bulkCreate(newPlaces);
    } catch (error) {
      return error;
    }
  },

  createOnePlace: async (newPlace) => {
    try {
      return await Place.create(newPlace);
    } catch (error) {
      return error;
    }
  },

  getLandmarkPlaces: async (paramList) => {
    try {
      /**
       * @param {paramList}: query params from users
       *
       * Create new sub-quey array from param list
       * adding "+" between elements of paramList
       */
      const subQuery = paramList.map((item) => `"${item}"`).join("+");

      /**
       * Create SQL query to Postgres db
       *
       * SQL: GET all Place that has most point matched with query params
       */
      const sql = `SELECT *, ${subQuery} AS point
              FROM "Place"
              ORDER BY point DESC LIMIT 5;`;

      const landmarkPlaces = await db.sequelize.query(sql, {
        type: QueryTypes.SELECT,
      });

      return landmarkPlaces;
    } catch (error) {
      return error;
    }
  },

  deletePlace: async (nameToDelete) => {
    try {
      const placeToDelete = await Place.findOne({
        where: { name: nameToDelete },
      });

      if (placeToDelete) {
        const deletedPlace = await Place.destroy({
          where: { name: nameToDelete },
        });
        return deletedPlace;
      }
      return null;
    } catch (error) {
      return error;
    }
  },

  updatePlace: async (id, updatePlace) => {
    try {
      const placeToUpdate = await Place.findOne({ where: { id } });

      if (placeToUpdate) {
        const updatedPlace = await Place.update(updatePlace, { where: { id } });
        return updatedPlace;
      }
      return null;
    } catch (error) {
      return error;
    }
  },

  deleteAllPlaces: async () => {
    try {
      return await Place.destroy({ where: {} });
    } catch (error) {
      return error;
    }
  },
};

module.exports = PlaceService;
