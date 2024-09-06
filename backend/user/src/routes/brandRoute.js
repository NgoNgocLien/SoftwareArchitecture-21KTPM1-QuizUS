const express = require('express');
const brandRoute = express.Router();

const { signup, getAll, get, search, update } = require('../controllers/brandController');

brandRoute.get('/', getAll);

brandRoute.get('/:id_brand', get);

brandRoute.get('/search/:keyword', search);

brandRoute.post('/signup', signup);

brandRoute.put('/', update);

module.exports = brandRoute