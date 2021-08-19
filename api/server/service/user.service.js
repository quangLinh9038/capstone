const db = require("../src/models");

const { User } = db;
const { Interest } = db;
const { Trip } = db;
const { UserInterest } = db;

const UserService = {
  getAllUser: async () => {
    try {
      return await User.findAll();
    } catch (error) {
      return error;
    }
  },
  
  //get user by email
  getOneUser: async (checkEmail) => {
    try {
      return await User.findOne({
        where: { email: checkEmail },
        include: [
          {
            model: Interest,
            as: "interests",
            attributes: ["id", "name", "img"],
          },
          {
            model: Trip,
            as: "trips",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  //create user
  createUser: async (newUser) => {
    try {
      return await User.create(newUser);
    } catch (error) {
      return error;
    }
  },

  //get user by id
  getUserInfo: async (id) => {
    try {
      return await User.findByPk(id, {
        include: [
          {
            model: Interest,
            as: "interests",
            attributes: ["id", "name", "img"],
          },
          {
            model: Trip,
            as: "trips",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  deleteAllUser: async () => {
    try {
      return await User.destroy({ where: {} });
    } catch (error) {
      return error;
    }
  },
};

module.exports = UserService;
