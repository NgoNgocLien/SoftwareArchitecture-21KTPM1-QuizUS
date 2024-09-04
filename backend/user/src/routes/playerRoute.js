const express = require('express');
const playerRoute = express.Router();
const {signup, otp,
    getAll, update
} = require('../controllers/playerController');

playerRoute.post('/signup', signup);

playerRoute.post('/otp', otp);

playerRoute.get('/', getAll);

playerRoute.put('/', update);

module.exports = playerRoute