const Accommodation = require("../models/accommodations.model");

const AccommodationController = {

    //get all acommodations
    getAllAccommodations: async (req, res) => {
        try {
            const allAccommodations = await Accommodation.findAll();

            return res.status(200).json(allAccommodations);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
};

module.exports = AccommodationController;