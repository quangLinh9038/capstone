const InterestService = require("../service/interest.service");

// const { Op } = db.Sequelize.Op;

const InterestController = {
  getAllInterests: async (req, res) => {
    try {
      const allInterests = await InterestService.getAllInterests();

      return allInterests.length
        ? res.status(200).json(allInterests)
        : res.status(404).json({
            msg: "Interests are empty!",
          });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

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
        const existInterest = await InterestService.getOneInterest(checkedName);

        // push to existed list
        if (existInterest) {
          existedInterestList.push(existInterest.name);
        }
      }

      // if there is none of existed interests
      // create new places
      // if not, return existed error messages
      if (Array.isArray(existedInterestList) && !existedInterestList.length) {
        // create list of places
        const _newInterests = await InterestService.createInterests(
          newInterests
        );
        return res.status(201).json({
          msg: "Interest created",
          results: _newInterests.length,
          newPlaces: _newInterests,
        });
      }

      return res.status(400).send({
        message: `Interests [ ${existedInterestList} ] are existed`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // delete interest by id
  deleteInterest: async (req, res) => {
    const { id } = req.params;

    try {
      const interestToDelete = await InterestService.deleteInterest(id);

      if (interestToDelete) {
        return res.status(200).send({
          message: `Interest: ${id} has been deleted successfully`,
        });
      }
      return res.status(404).send({
        message: `Interest: ${id} not found`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = InterestController;
