const { QueryTypes } = require("sequelize");
const db = require("../src/models");
const { Op } = require("sequelize");

const { Place } = db;
const { City } = db;

const generateSqlGetLandmarkResult = require("../utils/SqlUtils");

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
      /**
       *  individualHooks set to true to call beforeCreate hook for single bulk insert
       */
      return await Place.bulkCreate(newPlaces, { individualHooks: true });
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

  /**
   * Query Places for User's interests
   */
  getLandmarkPlaces: async (paramList, limit) => {
    try {
      /**
       * @param {paramList}: query params from users
       *
       * Create new sub-quey array from param list
       * adding "+" between elements of paramList
       */

      // model to query in Postgres database
      const model = "Place";

      const sql = generateSqlGetLandmarkResult(model, paramList, limit);

      const landmarkPlaces = await db.sequelize.query(sql, {
        type: QueryTypes.SELECT,
      });

      if (landmarkPlaces.length === 0) {
        console.log(
          "🚀 ~ file: place.service.js ~ line 92 ~ getLandmarkPlaces: ~ !landmarkPlaces.length",
          "Landmark places are not available"
        );
        return null;
      }
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
