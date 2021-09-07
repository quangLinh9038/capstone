const { Op } = require("sequelize");
/* 
Import services
*/
const CuisineNeo4jService = require("../../neo4j/service/cuisine.neo4j.service");
const CuisineService = require("../service/cuisine.service");

const CuisineController = {
  getAllCuisine: async (req, res) => {
    try {
      /* Get params*/
      const {
        name,
        isVietnamese,
        isWestern,
        isJapanese,
        isThai,
        isChinese,
        isIndian,
        isKorean,
      } = req.query;

      var nameOption = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
      var vietnameseOption = isVietnamese
        ? { isVietnamese: { [Op.eq]: 1 } }
        : null;
      var westernOption = isWestern ? { isWestern: { [Op.eq]: 1 } } : null;
      var japaneseOption = isJapanese ? { isJapanese: { [Op.eq]: 1 } } : null;
      var thaiOption = isThai ? { isThai: { [Op.eq]: 1 } } : null;
      var chineseOption = isChinese ? { isChinese: { [Op.eq]: 1 } } : null;
      var indianOption = isIndian ? { isIndian: { [Op.eq]: 1 } } : null;
      var koreanOption = isKorean ? { isKorean: { [Op.eq]: 1 } } : null;

      const conditionList = [
        nameOption,
        vietnameseOption,
        westernOption,
        japaneseOption,
        thaiOption,
        chineseOption,
        indianOption,
        koreanOption,
      ];
      // console.log(
      // "🚀 ~ file: cuisine.controller.js ~ line 49 ~ getAllCuisine: ~ conditionList",
      // conditionList
      // );

      /***
       * Set statement of condition is null
       * to check every object whether null or not
       */
      const isEveryObjectNull = (condition) => condition === null;

      if (!conditionList.every(isEveryObjectNull)) {
        const conditionalCuisines = await CuisineService.getConditionalCuisine(
          conditionList
        );
        // console.log(
        // "🚀 ~ file: cuisine.controller.js ~ line 60 ~ getAllCuisine: ~ conditionalCuisines",
        // conditionalCuisines
        // );
        /**
         * Check found Places
         * */
        return !conditionalCuisines.length
          ? res.status(404).json({
              status: "failure",
              message: `Conditional Cuisines not found`,
            })
          : res.json({
              status: "success",
              result: conditionalCuisines.length,
              data: conditionalCuisines,
            });
      }
      /**
       * If conditions are every null
       * return GET all places routes
       */
      const allCuisines = await CuisineService.getAllCuisine();

      return !allCuisines.length
        ? res.status(404).send({ message: `Cuisines are empty` })
        : res.json({
            status: "success",
            result: allCuisines.length,
            data: allCuisines,
          });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getMainCuisine: async (req, res) => {
    try {
      const cuisineParams = req.query.interests;
      const limit = req.query.limit;
      const category = req.query.category;

      const cuisines = await CuisineService.getAllCuisine();
      if (!cuisines.length) {
        return res
          .status(404)
          .json({ status: "failure", message: "Cuisines are empty" });
      }

      const mainCuisines = await CuisineService.getMainCuisine(
        cuisineParams,
        category,
        limit
      );

      return mainCuisines.length
        ? res.status(200).json({
            status: "success",
            results: mainCuisines.length,
            data: mainCuisines,
          })
        : res
            .status(404)
            .json({ status: "failure", message: "Main Cuisines not found" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createCuisine: async (req, res) => {
    try {
      const newCuisine = req.body;
      const existedCuisineList = [];

      if (!newCuisine.length) {
        return res
          .status(404)
          .json({ status: "failure", message: "Not found City ID" });
      }

      /*  
        Check for each element of array places
        whether existed place
      */
      for (const cuisine of newCuisine) {
        const existedCuisine = await CuisineService.getOneCuisineByName(
          cuisine.name
        );
        if (existedCuisine) {
          existedCuisineList.push(existedCuisine.name);
        }
      }

      /**
       * If there is none of existed places
       * create new places
       * If not, return existed error messages
       */
      if (Array.isArray(existedCuisineList) && !existedCuisineList.length) {
        /**
         * Use sequelize create() method
         * to POST data of places to Postgres
         */
        const _newCuisines = await CuisineService.createCuisines(newCuisine);

        if (!_newCuisines.length) {
          return res.status(400).json({ status: "failure", me });
        }

        for (const cuisine of _newCuisines) {
          const props = cuisine.dataValues;
          await CuisineNeo4jService.createCuisine(props);
        }
        return res.status(201).json({
          status: "success",
          results: _newCuisines.length,
          data: _newCuisines,
        });
      }
      return res.status(400).send({
        status: "failure",
        message: `Cuisines [ ${existedCuisineList} ] are existed`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteCuisineById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id)
        return res
          .status(400)
          .json({ status: "failure", message: "Missing id params" });

      const cuisineToDelete = await CuisineService.getOneCuisineById(id);

      if (cuisineToDelete) {
        await CuisineService.deleteCuisineById(id);

        await CuisineNeo4jService.deleteOneCuisineNode(
          cuisineToDelete.unique_point
        );
        return res.status(200).send({
          status: "success",
          message: `Cuisine with the ${id} has been deleted successfully`,
        });
      }

      return res.status(404).json({
        status: "failure",
        message: `Cuisine: ${id} not found`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteAllCuisine: async (req, res) => {
    try {
      const allCuisines = await CuisineService.getAllCuisine();

      if (!allCuisines.length) {
        return res.status(404).send({
          message: "Empty list!",
        });
      }
      await CuisineService.deleteAllCuisine();
      await CuisineNeo4jService.deleteAllCuisines();

      return res.status(200).json({
        status: "success",
        message: "Deleted all cuisines!",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateCuisine: async (req, res) => {
    try {
      const updateCuisine = req.body;
      const { id } = req.params;

      if (!updateCuisine || !id)
        return res
          .status(404)
          .json({ status: "failure", message: "Missing params or body" });

      const cuisineToUpdate = await CuisineService.getOneCuisineById(id);
      if (!cuisineToUpdate) {
        return res
          .status(404)
          .json({ status: "failure", message: "Not found Cuisine " });
      }

      const unique_point = cuisineToUpdate.unique_point;
      console.log(
        "🚀 ~ file: cuisine.controller.js ~ line 184 ~ updateCuisine: ~ unique_point",
        unique_point
      );

      if (cuisineToUpdate) {
        await CuisineService.updateOneCuisineById(id, updateCuisine);
        await CuisineNeo4jService.updateCuisine(unique_point, updateCuisine);
        return res.status(200).send({
          status: "success",
          message: `Cuisine with ${id} is updated successfully`,
        });
      }

      return res.status(404).send({
        status: "failure",
        message: `Cuisine with ${id} not found!`,
      });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  },
};

module.exports = CuisineController;
