const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");

/* Import models */
const db = require("../src/models");
const { Place } = db;
const { City } = db;

/* Import utils */
const generateSqlGetLandmarkResult = require("../utils/SqlUtils");

const PlaceService = {
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
  getPlaceByUniquePoint: async (unique_point) => {
    try {
      return await Place.findOne({
        where: { unique_point: unique_point },
        include: [{ model: City, as: "city" }],
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

  /**
   * Query Places for User's interests
   */
  getLandmarkPlaces: async (params, limit, duplicatedPlace) => {
    try {
      /**
       * @param {params}: query params from users
       *
       * Create new sub-quey array from param list
       * adding "+" between elements of paramList
       */

      // model to query in Postgres database
      const model = "Place";
      const sql = generateSqlGetLandmarkResult(
        model,
        params,
        limit,
        duplicatedPlace
      );

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
