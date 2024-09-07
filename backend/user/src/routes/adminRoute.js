const express = require('express');
const adminRoute = express.Router();

const { createAdmin, updateAdmin, deleteAdmin, updatePassword, getStats } = require('../controllers/adminController');

adminRoute.post('/', createAdmin);

adminRoute.put('/', updateAdmin);

adminRoute.delete('/', deleteAdmin);

adminRoute.get('/stats', getStats);

adminRoute.put('/updatePwd', updatePassword);

module.exports = adminRoute