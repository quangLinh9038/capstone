const app = require("..");
const Place = require("../models/place");
const doQuery = require("../utils/doQuery")
const { Sequelize, DataTypes, Model, QueryTypes } = require('sequelize');
const { sequelize } = require("../models/place");

  
const PlaceController = {

  getAllPlaces: async (req, res) => {
    try {

      const allPlaces = await Place.findAll();

      if(allPlaces == null){
        return res.status(204).send({
          message: "Empty list",
        })
      }
      res.json(allPlaces)
    
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get main place
  getMainPlace: async(req, res) => {

    const params = req.params; 
    console.log(params)

    const sql = `SELECT *, ("isUrban" + "isShopping") AS point
            FROM "Places"
            ORDER BY point DESC;`
  
    const mainPlaces = await sequelize.query(sql, 
      {
        type: QueryTypes.SELECT 
      });

      return res.send(mainPlaces);
  },


  createPlace: async (req, res) => {
    try {

      const {name} = req.body;
      console.log(name);

      const existPlace = await Place.findOne({ where: { name: name } })
      console.log(existPlace);

      if (existPlace) {
        return res.status(400).send({
          
          message: "Existed place",
       
        });
      };
      
      const newPlace =
        {
          name: req.body.name,
          url: req.body.url,
          img1: req.body.img1,
          img2: req.body.img2,
          isHistorical: req.body.isHistorical,
          isUrban: req.body.isUrban,
          isReligious: req.body.isReligious,
          isMuseum: req.body.isMuseum,
          isShopping: req.body.isShopping,
          isAdventure: req.body.sAdventure,
          isNature: req.body.isNature,
          isPark: req.body.isPark,
        }
        
      await Place.create(newPlace).then((data) => {
        res.status(201).send(data);
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
