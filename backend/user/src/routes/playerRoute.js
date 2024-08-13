const express = require('express');
const playerRoute = express.Router();
const {signup} = require('../controllers/playerController');

playerRoute.post('/signup', signup);

module.exports = playerRoute