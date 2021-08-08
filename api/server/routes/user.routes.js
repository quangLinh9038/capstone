const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const auth = require('../middleware/auth')

const userRoutes = Router();

userRoutes
  .get('/infor', auth, UserController.getUser)
  .get('/logout', UserController.logout)
  .post('/login', UserController.login)
  .post('/register', UserController.register)
  .get('/refresh_token', UserController.refreshToken)
  .post('/add_interest', auth, UserController.addInterest)

module.exports = userRoutes;
