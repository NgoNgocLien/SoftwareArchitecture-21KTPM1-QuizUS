const express = require('express');
const playerRoute = express.Router();
const {signup, otp, login} = require('../controllers/playerController');

playerRoute.post('/login', login);

playerRoute.post('/signup', signup);

playerRoute.post('/otp', otp);

module.exports = playerRoute