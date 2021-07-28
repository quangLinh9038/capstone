const { QueryTypes } = require("sequelize");
const db = require("../src/models");

const { Accommodation } = db;

const AccommodationService = {
  // get all accommodations
  getAllAccommodations: async () => {
    try {
      return await Accommodation.findAll();
    } catch (error) {
      return error;
    }
  },

  // get a accommodation by name
  getOneAccommodation: async (checkedName) => {
    try {
      return await Accommodation.findOne({
        where: { name: checkedName },
      });
    } catch (error) {
      return error;
    }
  },

  // get main accommodation from user's interests
  getMainAccommodation: async (paramList) => {
    try {
      const subQuery = paramList.map((item) => `"${item}"`);
      console.log(subQuery);

      const sql = `SELECT * FROM "Accommodation" WHERE ${subQuery} = 1
      LIMIT 5;`;

      const sql1 = `SELECT *, ${subQuery} AS point
              FROM "Accommodation"
              ORDER BY point DESC LIMIT 5;`;

      const mainAccommodation = await db.sequelize.query(sql, {
        type: QueryTypes.SELECT,
      });

      return mainAccommodation;
    } catch (error) {
      return error;
    }
  },

  // bulkCreate accommodations
  createAccommodations: async (newAccommodations) => {
    try {
      /**
       * individualHooks to call beforeCreate for single bulk create
       */
      return await Accommodation.bulkCreate(newAccommodations, {
        individualHooks: true,
      });
    } catch (error) {
      return error;
    }
  },

  deleteAllAccommodations: async () => {
    try {
      return await Accommodation.destroy({ where: {} });
    } catch (error) {
      return error;
    }
  },
};

module.exports = AccommodationService;
