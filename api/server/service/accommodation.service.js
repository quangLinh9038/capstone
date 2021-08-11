const { QueryTypes } = require("sequelize");
const db = require("../src/models");

const { Accommodation } = db;

const AccommodationService = {
  getAllAccommodations: async () => {
    try {
      return await Accommodation.findAll({
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

  getOneAccommodationById: async (id) => {
    try {
      return await Accommodation.findByPk(id, {
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
  // get a accommodation by name
  getOneAccommodationByName: async (checkedName) => {
    try {
      return await Accommodation.findOne({
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

  // get main accommodation from user's interests
  getMainAccommodation: async (paramList, limit) => {
    try {
      const sql = `SELECT * FROM "Accommodation" WHERE "${paramList}" = 1
      LIMIT ${limit};`;

      const mainAccommodation = await db.sequelize.query(sql, {
        type: QueryTypes.SELECT,
      });

      const result = !mainAccommodation.length ? null : mainAccommodation;

      return result;
    } catch (error) {
      return error;
    }
  },

  createAccommodations: async (newAccommodations) => {
    try {
      return await Accommodation.bulkCreate(newAccommodations);
    } catch (error) {
      return error;
    }
  },

  deleteAccommodationById: async (id) => {
    try {
      const accommodationToDelete = await Accommodation.findByPk(id);

      return await accommodationToDelete.destroy();
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

  updateAccommodation: async (id, updateAccommodation) => {
    try {
      const accommodationToUpdate = await Accommodation.findByPk(id);

      if (accommodationToUpdate) {
        const updatedAccommodation = await Accommodation.update(
          updateAccommodation,
          { where: { id } }
        );
        return updatedAccommodation;
      }
      return null;
    } catch (error) {
      return error;
    }
  },
};

module.exports = AccommodationService;
