const express = require('express');
const playerRoute = express.Router();
const {signup, otp,
    getAll, update, search
} = require('../controllers/playerController');

playerRoute.post('/signup', signup);

playerRoute.post('/otp', otp);

playerRoute.get('/', getAll);

playerRoute.put('/', update);

playerRoute.get('/search/:keyword', search);

module.exports = playerRoute