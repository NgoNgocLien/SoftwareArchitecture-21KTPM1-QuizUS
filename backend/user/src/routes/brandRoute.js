const express = require('express');
const brandRoute = express.Router();

const { signup, getAll, search } = require('../controllers/brandController');

brandRoute.get('/', getAll);

brandRoute.get('/search/:keyword', search);

brandRoute.post('/signup', signup);

module.exports = brandRoute