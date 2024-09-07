const express = require('express');
const router = express.Router();
const axios = require('axios');
const Voucher = require('../models/voucher');
const PlayerVoucher = require('../models/playerVoucher');
const Campaign = require('../models/campaign');
const PlayerGame = require('../models/playerGame');
const { 
  getActive,
  searchByBrand,
  create,
  update,
  getExchanged,
  exchangeByCoin,
  exchangeByItem,
  use,
} = require('../controllers/voucherController');

// Lấy tất cả voucher đang hoạt động
router.get('/active', getActive);

// Tìm kiếm voucher theo brand
router.get('/search/brand/:id_brand', searchByBrand);

// Tạo voucher
router.post('/', create);

// Cập nhật một voucher
router.put('/', update);

// Lấy tất cả voucher đã đổi của player
router.get('/exchange/:id_player', getExchanged);

// đổi voucher bằng xu
router.post('/exchange/coin', exchangeByCoin);

// đổi voucher bằng mảnh ghép
router.post('/exchange/item', exchangeByItem);

// Sử dụng voucher
router.put('/used', use);

module.exports = router;