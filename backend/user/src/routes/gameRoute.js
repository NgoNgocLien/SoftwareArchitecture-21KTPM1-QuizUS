const express = require('express');
const gameRoute = express.Router();

const { get, update } = require('../controllers/gameController');

gameRoute.get('/:id_game', get);

gameRoute.put('/', update);

module.exports = gameRoute