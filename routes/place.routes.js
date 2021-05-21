const {Router} = require('express');
const PlaceController = require('../controllers/place.controller')

const router = Router(); 

router.get('/', PlaceController.getAllPlaces)
    .post('/', PlaceController.createPlace)
    .delete('/:name', PlaceController.deletePlace);

module.exports = router; 