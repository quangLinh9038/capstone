/* 
  Import models
*/
const db = require("../src/models");
const { Trip } = db;
const { User } = db;
const { Itinerary } = db;
const { Place } = db;
const { Accommodation } = db;
const { Cuisine } = db;

const TripService = {
  getAllTrips: async () => {
    try {
      return await Trip.findAll({
        include: [
          {
            model: Itinerary,
            as: "itineraries",
            include: [
              {
                model: Place,
                as: "places",
              },
              {
                model: Accommodation,
                as: "accommodations",
              },
              {
                model: Cuisine,
                as: "cuisines",
              },
            ],
          },
          {
            model: User,
            as: "user",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  getAllTripByUser: async (uId) => {
    try {
      return await Trips.findAll({
        where: { user_id: uId },
        include: [
          {
            model: Itinerary,
            as: "itineraries",
            include: [
              {
                model: Place,
                as: "places",
              },
              {
                model: Accommodation,
                as: "accommodations",
              },
              {
                model: Cuisine,
                as: "cuisines",
              },
            ],
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  getOneTripById: async (id) => {
    try {
      return await Trip.findOne({
        where: { id: id },
        include: [
          {
            model: Itinerary,
            as: "itineraries",
            include: [
              {
                model: Place,
                as: "places",
              },
              {
                model: Accommodation,
                as: "accommodations",
              },
              {
                model: Cuisine,
                as: "cuisines",
              },
            ],
          },
          {
            model: User,
            as: "user",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  createOneTrip: async (newTrip) => {
    try {
      return await Trip.create(newTrip);
    } catch (error) {
      return error;
    }
  },

  deleteTripById: async (tripToDelete) => {
    try {
      return await tripToDelete.destroy();
    } catch (error) {
      return error;
    }
  },

  deleteAllTrip: async () => {
    try {
      return await Trip.destroy({ where: {} });
    } catch (error) {
      return error;
    }
  },

  updateTripById: async (id, updateTrip) => {
    try {
      const tripToUpdate = await Trip.findByPk(id);

      if (tripToUpdate) {
        const _updateTrip = await Trip.update(updateTrip, {
          where: { id: id },
        });
        return _updateTrip;
      }
    } catch (error) {
      return error;
    }
  },
};

module.exports = TripService;
