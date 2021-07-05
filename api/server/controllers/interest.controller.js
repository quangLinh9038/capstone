const { QueryTypes } = require('sequelize');
const db = require('../models');
// import Place model
const { user } = db;
const {Interest} = db

// const { Op } = db.Sequelize.Op;

const InterestController = {
  getAllInterests: async (req, res) => {
    try {
      const allInterests = await Interest.findAll({
          include: [{
              model: user,
              as: 'user'
          }]
      });
      // check empty list
      if (allInterests === null) {
        return res.status(204).send({
          message: 'Interests are empty!',
        });
      }

      // response list of users
      return res.status(200).json(allInterests);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // create new users
  createInterest: async (req, res) => {
    try {
      // check existed users
      const newInterests = req.body;
      const existedInterestList = [];

      // check for each element of array users
      // whether existed place
      for (let i = 0; i < newInterests.length; i += 1) {
        const checkedName = newInterests[i].name;

        // eslint-disable-next-line no-await-in-loop
        const existInterest = await Interest.findOne({
          where: { name: checkedName },
        });

        // push to existed list
        if (existInterest) {
            existedInterestList.push(existInterest.name);
        }
      }

      // if there is none of existed places
      // create new places
      // if not, return existed error messages
      if (Array.isArray(existedInterestList) && !existedInterestList.length) {
        // create list of places
        await Interest.bulkCreate(newInterests).then((data) => res.status(201).send(data));
      }

      console.log(newInterests);
      // INSERT query to Neo4j
      // IMPORT json
      return res.status(400).send({
        message: `Interests [ ${existedInterestList} ] are existed`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = InterestController;