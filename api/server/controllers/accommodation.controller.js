const AccommodationService = require("../service/accommodation.service");

const AccommodationController = {
  // get all accommodations
  getAllAccommodations: async (req, res) => {
    try {
      const allAccommodations =
        await AccommodationService.getAllAccommodations();

      return res.status(200).json(allAccommodations);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  // get matched accommodations with user's interests
  getNearestAccommodations: async (req, res) => {
    try {
      // return here
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  createAccommodations: async (req, res) => {
    try {
      const newAccommodations = req.body;

      // todo: check existed accommodations

      if (!newAccommodations.length) {
        return res.status(400).send({
          message: "Not found any accommodation!",
        });
      }

      return await AccommodationService.createAccommodations(
        newAccommodations
      ).then((data) => res.status(201).send(data));
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  deleteAllAccommodations: async (req, res) => {
    try {
      const accommodations = await AccommodationService.getAllAccommodations();

      if (!accommodations.length) {
        return res.status(400).send({
          message: "Empty list!",
        });
      }

      return await AccommodationService.deleteAllAccommodations().then(() =>
        res.status(200).send({
          message: "Deleted all accommodations!",
        })
      );
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = AccommodationController;
