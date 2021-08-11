const { QueryTypes } = require("sequelize");
const db = require("../src/models");

const { Interest } = db;
const { User } = db;

const InterestService = {
  // get all interest
  getAllInterests: async () => {
    try {
      return await Interest.findAll({
        includes: [
          {
            model: User,
            as: "users",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  // create interests
  createInterests: async (newInterests) => {
    try {
      /**
       *  individualHooks set to true to call beforeCreate hook for single bulk insert
       */
      return await Interest.bulkCreate(newInterests, { individualHooks: true });
    } catch (error) {
      return error;
    }
  },

  // find interest by name
  getOneInterest: async (checkedName) => {
    try {
      return await Interest.findOne({
        where: { name: checkedName },
      });
    } catch (error) {
      return error;
    }
  },

  //get interest by id
  getInterestInfo: async (interest_id) => {
    try {
      return await Interest.findOne({ where: { id: interest_id } });
    } catch (error) {
      return error;
    }
  },

  // delete interest by id
  deleteInterest: async (id) => {
    try {
      const interestToDelete = await Interest.findOne({
        where: { id: id },
      });

      if (interestToDelete) {
        const deletedInterest = await Interest.destroy({
          where: { id: id },
        });
        return deletedInterest;
      }
      return null;
    } catch (error) {
      return error;
    }
  },
};

module.exports = InterestService;