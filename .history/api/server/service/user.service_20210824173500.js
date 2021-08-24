const db = require("../src/models");

const { User } = db;
const { Interest } = db;
<<<<<<< HEAD
const { UserInterest } = db;
const { Trip } = db;
const { Itinerary } = db;
const { Place } = db;
const { Accommodation } = db;
const { Cuisine } = db;
=======
const { Trip } = db;
const { UserInterest } = db;
>>>>>>> b82dc5dfa6e1da20f66a216e85ce6aa770ddf70f

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

<<<<<<< HEAD
  getTripsByUser: async (id) => {
    console.log(
      "🚀 ~ file: user.service.js ~ line 73 ~ getTripsByUser: ~ user_id",
      id
    );
    try {
      return await User.findByPk(id, {
        include: [
          {
            model: Trip,
            as: "trips",
            include: [
              {
                model: Itinerary,
                as: "itineraries",
                include: [
                  { model: Place, as: "places" },
                  { model: Accommodation, as: "accommodations" },
                  { model: Cuisine, as: "cuisines" },
                ],
              },
            ],
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  //delete UserInterest association
  removeUserInterest: async (user_id, interest_id) => {
    try {
      const userInterest = await UserInterest.findOne({
        where: { user_id: user_id, interest_id: interest_id },
      });

      if (userInterest) {
        const deletedUserInterest = await UserInterest.destroy({
          where: { user_id: user_id, interest_id: interest_id },
        });
        return deletedUserInterest;
      }
      return null;
    } catch (error) {
      return error;
    }
  },

=======
>>>>>>> b82dc5dfa6e1da20f66a216e85ce6aa770ddf70f
  deleteAllUser: async () => {
    try {
      return await User.destroy({ where: {} });
    } catch (error) {
      return error;
    }
  },
};

module.exports = UserService;
