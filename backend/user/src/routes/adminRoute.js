const express = require('express');
const adminRoute = express.Router();

const { createAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');

adminRoute.post('/', createAdmin);

adminRoute.put('/', updateAdmin);

adminRoute.delete('/', deleteAdmin);

module.exports = adminRoute