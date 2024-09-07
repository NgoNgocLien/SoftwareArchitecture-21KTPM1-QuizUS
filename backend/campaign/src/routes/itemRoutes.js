const express = require('express');
const router = express.Router();
const Item = require('../models/campaignItem');
// const Campaign = require('../models/campaign');
const { create, update } = require('../controllers/itemController');

// Tạo item
router.post('/', create);

// Cập nhật một item
router.put('/', update);


module.exports = router;
