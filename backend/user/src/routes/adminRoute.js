const express = require('express');
const adminRoute = express.Router();

const { createAdmin, updateAdmin, deleteAdmin, updatePassword } = require('../controllers/adminController');

adminRoute.post('/', createAdmin);

adminRoute.put('/', updateAdmin);

adminRoute.delete('/', deleteAdmin);

adminRoute.put('/updatePwd', updatePassword);

module.exports = adminRoute