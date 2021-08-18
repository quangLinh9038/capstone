const CityService = require("../service/city.service");

const CityController = {
  createMewCities: async (req, res) => {
    try {
      const newCities = req.body;
      const existedCitiesList = [];

      // check for each element of array users
      // whether existed place
      for (let i = 0; i < newCities.length; i += 1) {
        const checkedName = newCities[i].name;

        // eslint-disable-next-line no-await-in-loop
        const existCity = await InterestService.getOneInterest(checkedName);

        // push to existed list
        if (existCity) {
          existedCitiesList.push(existCity.name);
        }
      }

      // if there is none of existed interests
      // create new cities
      // if not, return existed error messages
      if (Array.isArray(existedCitiesList) && !existedCitiesList.length) {
        // create list of cities
        const _newCities = await CityService.createNewCity(newCities);
        return res.status(201).json({
          status: "success",
          results: _newCities.length,
          newPlaces: _newCities,
        });
      }

      return res.status(400).send({
        message: `Cities [ ${existedCitiesList} ] are existed`,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
module.exports = CityController;
