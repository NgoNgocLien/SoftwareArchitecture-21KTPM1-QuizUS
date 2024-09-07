const express = require('express');
const playerRoute = express.Router();
const { signup, otp,
    get, getAll, update, search, exchangeVoucherByCoin, getPlayerScore
} = require('../controllers/playerController');

playerRoute.post('/signup', signup);

playerRoute.post('/otp', otp);

playerRoute.get('/', getAll);

playerRoute.get('/score/:id_player', getPlayerScore);

playerRoute.get('/:id_player', get);

playerRoute.put('/', update);

playerRoute.get('/search/:keyword', search);

playerRoute.put('/coin', exchangeVoucherByCoin);

playerRoute.get('/score', getPlayerScore);


module.exports = playerRoute