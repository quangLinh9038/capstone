const db = require('../src/models');

const { User } = db;
const { Interest } = db;
const { UserInterest } = db;
const { Trip } = db;
const { Itinerary } = db;
const { Accommodation } = db;

const UserService = {
  getAllUser: async () => {
    try {
      return await User.findAll();
    } catch (error) {
      return error;
    }
  },

  //get user by email
  getOneUserByEmail: async (checkEmail) => {
    try {
      return await User.findOne({
        where: { email: checkEmail },
        include: [
          {
            model: Interest,
            as: 'interests',
            attributes: ['id', 'name', 'img'],
          },
          {
            model: Trip,
            as: 'trips',
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
            as: 'interests',
            attributes: ['id', 'name', 'img'],
          },
          {
            model: Trip,
            as: 'trips',
            include: [
              {
                model: Itinerary,
                as: 'itineraries',
                include: [{ model: Accommodation, as: 'accommodations' }],
              },
            ],
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  // delete UserInterest association
  removeUserInterest: async (user_id, interest_id) => {
    try {
      const userInterest = await UserInterest.findOne({
        where: { user_id: user_id, interest_id: interest_id },
      });

      if (userInterest) {
        return await UserInterest.destroy({
          where: { user_id: user_id, interest_id: interest_id },
        });
      }
      return null;
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
