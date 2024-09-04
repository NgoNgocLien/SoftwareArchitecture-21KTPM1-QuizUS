const express = require('express');
const brandRoute = express.Router();

const { signup } = require('../controllers/brandController');

brandRoute.post('/signup', signup);

module.exports = brandRoute