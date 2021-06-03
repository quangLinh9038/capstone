const Place = require("../models/place");

const PlaceController = {
  getAllPlaces: async (req, res) => {
    try {
      if (!req.body.name) {
        res.status(400).send({
          message: "Empty list",
        });
      }
      const allPlaces = await Place.findAll();

      res.json(allPlaces);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createPlace: async (req, res) => {
    try {
      if (!req.body.name) {
        res.status(400).send({
          message: "Empty list",
        });
        return;
      }

      const newPlaces = [
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
          isAdventure: req.body.isAdventure,
          isNature: req.body.isNature,
          isPark: req.body.isPark,
        },
      ];

      await Place.bulkCreate(newPlaces).then((data) => {
        res.send(data);
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
