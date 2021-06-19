const db = require("../models");
const Op = db.Sequelize.Op;

const Place = require("../models/place.model");

const { QueryTypes, json } = require("sequelize");
const PlaceController = {
  // get all Places
  getAllPlaces: async (req, res) => {
    try {
      const allPlaces = await Place.findAll();

      //check empty list
      if (allPlaces == null) {
        return res.status(204).send({
          message: "Empty list",
        });
      }

      // response list of places
      res.status(200).json(allPlaces);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get main place
  getMainPlace: async (req, res) => {

    const param1 = req.query.param1;
    const param2 = req.query.param2;

    let list = [param1, param2];
    const subQuery = list.map(item => `"${item}"`).join("+")
    console.log(subQuery); 

    // let subQuery = list 
    const sql = `SELECT *, ${subQuery} AS point
            FROM "Places"
            ORDER BY point DESC;`;

    const mainPlaces = await db.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });

    return res.send(mainPlaces);
  },

  //create new places
  createPlace: async (req, res) => {
    try {
      // check existed places
      const newPlaces = req.body;
      const existedPlaceList = [];

      // check for each element of array places
      // whether existed place
      for (let i = 0; i < newPlaces.length; i++) {
        const checkedName = newPlaces[i].name;

        const existPlace = await Place.findOne({
          where: { name: checkedName },
        });

        // push to existed list
        if (existPlace) {
          existedPlaceList.push(existPlace.name);
        }
      }

      // if there is none of existed places
      // create new places
      // if not, return existed error messages
      if (Array.isArray(existedPlaceList) && !existedPlaceList.length) {
        // create list of places
        await Place.bulkCreate(newPlaces).then((data) => {
          return res.status(201).send(data);
        });
      }
      return res.status(400).send({
        message: "Places " + "[ " + existedPlaceList + " ]" + " are existed",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deletePlace: async (req, res) => {
    try {
      const name = req.params.name;

      await Place.destroy({
        where: { name: name },
      }).then((num) => {
        if (num == 1) {
          res.send({
            message: "Deleted",
          });
        } else {
          res.send({
            message: "Error with name=${name}",
          });
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

};

module.exports = PlaceController;
