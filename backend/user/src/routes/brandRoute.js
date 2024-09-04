const express = require('express');
const brandRoute = express.Router();

const { signup, getAll, search, update } = require('../controllers/brandController');

brandRoute.get('/', getAll);

brandRoute.get('/search/:keyword', search);

brandRoute.post('/signup', signup);

brandRoute.put('/', update);

module.exports = brandRoute