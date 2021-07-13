const { Router } = require('express');
const AccommodationController = require('../controllers/accommodation.controller');

const accommodationRoutes = Router();

accommodationRoutes
  .get('/', AccommodationController.getAllAccommodations)
  .post('/', AccommodationController.createAccommodations)
  .delete('/', AccommodationController.deleteAllAccommodations);

module.exports = accommodationRoutes;
