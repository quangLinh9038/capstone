const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");

/* Import models */
const db = require("../src/models");
const { Cuisine } = db;
const { City } = db;

const CuisineService = {
  getAllCuisine: async () => {
    try {
      return await Cuisine.findAll({
        order: [["id", "ASC"]],
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

  getMainCuisine: async (params, category, limit) => {
    try {
      let subQuery;
      if (typeof params === "string") {
        subQuery = `"${params}"`;
      } else {
        subQuery = params.map((item) => `"${item}"`).join("+");
      }

      const model = "Cuisine";
      const sql = `SELECT *, ${subQuery} AS point
                FROM "${model}" WHERE category='${category}'
                ORDER BY point DESC LIMIT ${limit};`;

      const mainCuisine = await db.sequelize.query(sql, {
        type: QueryTypes.SELECT,
        include: [{ model: City, as: "city" }],
      });

      return mainCuisine ? mainCuisine : null;
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
