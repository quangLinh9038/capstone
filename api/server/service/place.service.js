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
        include: [
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
        include: [
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

  // get a place by name
  getOnePlace: async (checkedName) => {
    try {
      return await Place.findOne({
        where: { name: checkedName },
        include: [
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

  getPlaceById: async (placeId) => {
    try {
      return await Place.findByPk(placeId, {
        include: [
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
  // create a list of places
  createPlaces: async (newPlaces) => {
    try {
      /**
       *  individualHooks set to true to call beforeCreate hook for single bulk insert
       */
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
        include: [
          {
            model: City,
            as: "city",
          },
        ],
      });

      return !landmarkPlaces.length ? null : landmarkPlaces;
    } catch (error) {
      return error;
    }
  },

  deletePlaceById: async (id) => {
    try {
      const placeToDelete = await Place.findByPk(id);

      if (placeToDelete) {
        return await placeToDelete.destroy();
      }
      return null;
    } catch (error) {
      return error;
    }
  },

  updatePlace: async (id, updatePlace) => {
    try {
      const placeToUpdate = await Place.findByPk(id);

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
