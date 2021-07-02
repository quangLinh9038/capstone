const { QueryTypes } = require('sequelize');
const db = require('../models');
// import Place model
const { user } = db;
const {Interest} = db

// const { Op } = db.Sequelize.Op;

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await user.findAll({
          include: [{
              model: Interest,
              as: 'interests'
          }]
      });
      // check empty list
      if (allUsers === null) {
        return res.status(204).send({
          message: 'Users are empty!',
        });
      }

      // response list of users
      return res.status(200).json(allUsers);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // create new users
  createUser: async (req, res) => {
    try {
      // check existed users
      const newUsers = req.body;
      const existedUserList = [];

      // check for each element of array users
      // whether existed place
      for (let i = 0; i < newUsers.length; i += 1) {
        const checkedName = newUsers[i].name;

        // eslint-disable-next-line no-await-in-loop
        const existUser = await user.findOne({
          where: { name: checkedName },
        });

        // push to existed list
        if (existUser) {
            existedUserList.push(existUser.name);
        }
      }

      // if there is none of existed places
      // create new places
      // if not, return existed error messages
      if (Array.isArray(existedUserList) && !existedUserList.length) {
        // create list of places
        await user.bulkCreate(newUsers).then((data) => res.status(201).send(data));
      }

      console.log(newUsers);
      // INSERT query to Neo4j
      // IMPORT json
      return res.status(400).send({
        message: `Users [ ${existedUserList} ] are existed`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = UserController;