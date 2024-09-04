const express = require('express');
const brandRoute = express.Router();

const { signup, getAll } = require('../controllers/brandController');

brandRoute.get('/', getAll);

brandRoute.post('/signup', signup);

module.exports = brandRoute