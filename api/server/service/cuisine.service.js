const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");

/* Import models */
const db = require("../src/models");
const { Cuisine } = db;
const { City } = db;

/* Import utils */
const generateSqlGetLandmarkResult = require("../utils/SqlUtils");

const CuisineService = {
  getAllCuisine: async () => {
    try {
      return await Cuisine.findAll({
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

  getConditionalCuisine: async (conditions) => {
    try {
      return await Cuisine.findAll({
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
  getMainCuisine: async (params, limit) => {
    try {
      // console.log(
      // "🚀 ~ file: cuisine.service.js ~ line 48 ~ getMainCuisine: ~ params",
      // params
      // );

      const model = "Cuisine";

      const sql = generateSqlGetLandmarkResult(model, params, limit);

      const mainCuisine = await db.sequelize.query(sql, {
        type: QueryTypes.SELECT,
        include: [{ model: City, as: "city" }],
      });

      return !mainCuisine ? null : mainCuisine;
    } catch (error) {
      return error;
    }
  },

  getOneCuisineById: async (id) => {
    try {
      return await Cuisine.findByPk(id);
    } catch (error) {
      return error;
    }
  },

  getOneCuisineByName: async (name) => {
    try {
      return await Cuisine.findOne({
        where: { name: name },
        include: [{ model: City, as: "city" }],
      });
    } catch (error) {
      return error;
    }
  },
  getOneCuisineByUniquePoint: async (unique_point) => {
    try {
      return await Cuisine.findOne({
        where: { unique_point: unique_point },
        include: [{ model: City, as: "city" }],
      });
    } catch (error) {
      return error;
    }
  },

  createCuisines: async (newCuisines) => {
    try {
      return await Cuisine.bulkCreate(newCuisines);
    } catch (error) {
      return error;
    }
  },

  deleteCuisineById: async (id) => {
    try {
      return await Cuisine.destroy({ where: { id } });
    } catch (error) {
      return error;
    }
  },

  deleteAllCuisine: async () => {
    try {
      return await Cuisine.destroy({ where: {} });
    } catch (error) {
      return error;
    }
  },

  updateOneCuisineById: async (id, updateCuisine) => {
    try {
      const updatedCuisine = await Cuisine.update(updateCuisine, {
        where: { id },
      });
      return updatedCuisine;
    } catch (error) {
      return error;
    }
  },
};

module.exports = CuisineService;
