const routes = require('express').Router();
const placesRoute = require('./place.routes');
const accommodationsRoute = require('./accommodation.route');

routes.use('/places', placesRoute);
routes.use('/accommodations', accommodationsRoute);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Server connected!' });
});

module.exports = routes;
