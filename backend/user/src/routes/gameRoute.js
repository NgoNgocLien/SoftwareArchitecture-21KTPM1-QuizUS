const express = require('express');
const gameRoute = express.Router();

const { get } = require('../controllers/gameController');

gameRoute.get('/:id_game', get);

module.exports = gameRoute