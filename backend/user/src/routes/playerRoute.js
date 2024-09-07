const express = require('express');
const playerRoute = express.Router();
const { signup, otp,
    get, getAll, update, search, exchangeVoucherByCoin, getPlayerScore
} = require('../controllers/playerController');

playerRoute.post('/signup', signup);

playerRoute.post('/otp', otp);

playerRoute.get('/', getAll);

playerRoute.get('/:id_player', get);

playerRoute.put('/', update);

playerRoute.get('/search/:keyword', search);

playerRoute.get('/score', getPlayerScore)

playerRoute.put('/coin', exchangeVoucherByCoin);

module.exports = playerRoute