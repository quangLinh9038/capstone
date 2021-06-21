const { Router } = require('express');
const AccommodationController = require('../controllers/accommodation.controller');

const accommodationRoutes = Router(); 

accommodationRoutes.get('/', AccommodationController.getAllAccommodations); 

module.exports = accommodationRoutes;