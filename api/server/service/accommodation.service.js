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
      // const subQuery = paramList.map((item) => `"${item}"`);
      // console.log(`Accomms params: ${subQuery}`);
      const sql = `SELECT * FROM "Accommodation" WHERE "${paramList}" = 1
      LIMIT 5;`;

      const mainAccommodation = await db.sequelize.query(sql, {
        type: QueryTypes.SELECT,
      });

      if (mainAccommodation.length === 0) {
        console.log(
          "🚀 ~ file: accommodation.service.js ~ line 40 ~ getMainAccommodation: ~ !mainAccommodation.length",
          "Main Accommodations not found"
        );
        return null;
      }

      return mainAccommodation;
    } catch (error) {
      return error;
    }
  },

  createAccommodations: async (newAccommodations) => {
    try {
      /**
       * individualHooks to call beforeCreate for single bulk create
       */
      return await Accommodation.bulkCreate(newAccommodations);
    } catch (error) {
      return error;
    }
  },

  deleteAccommodationById: async (id) => {
    try {
      const accommodationToDelete = await Accommodation.findByPk(id);
      console.log(
        "🚀 ~ file: accommodation.service.js ~ line 67 ~ deleteAccommodationById: ~ accommodationToDelete",
        accommodationToDelete
      );

      if (accommodationToDelete) {
        return await accommodationToDelete.destroy();
      }
      return null;
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
