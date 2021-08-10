const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const userRoutes = Router();

userRoutes
  .get('/', UserController.getAllUsers)
  .post('/', UserController.createUser);

module.exports = userRoutes;
