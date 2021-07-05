const { Router } = require('express');
const PlaceController = require('../controllers/place.controller');

const placeRoutes = Router();

placeRoutes
  .get('/', PlaceController.getAllPlaces)
  .get('/mainPlaces', PlaceController.getLandmarkPlaces)
  .post('/', PlaceController.createPlace)
  .delete('/:name', PlaceController.deletePlace)
  .put('/:id', PlaceController.updatePlace);

module.exports = placeRoutes;
