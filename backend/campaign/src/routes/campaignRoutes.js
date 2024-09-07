const express = require('express');
const router = express.Router();
const axios = require('axios');
const Campaign = require('../models/campaign');
const PlayerLikeCampaign = require('../models/playerLikeCampaign');
const PlayerGame = require('../models/playerGame');
const {
    getAll,
    getInProgress,
    getBrandCampaign,
    search,
    searchByBrand,
    getById,
    create,
    update,
    getPlayerFavorite,
    getRedeemableByCoin,
    getRedeemableByItem,
    like,
    unlike,
    getCampaignsOfVoucher,
    getStats
} = require('../controllers/campaignController');

// Lấy tất cả các chiến dịch
router.get('/', getAll);

// Lấy tất cả các chiến dịch đang diễn ra
router.get('/in_progress', getInProgress);

//Lấy thông số từ database
router.get('/stats', getStats);

// Lấy tất cả các chiến dịch của một brand theo id_brand
router.get('/brand/:id_brand', getBrandCampaign);

// Tìm kiếm chiến dịch
router.get('/search/:keyword', search);

//lấy tẩt cả campaign của 1 voucher
router.get('/search/voucher/:id_voucher', getCampaignsOfVoucher);

// Tìm kiếm chiến dịch của một brand
router.get('/search/:id_brand/:keyword', searchByBrand);

// Lấy thông tin của một chiến dịch
router.get('/:id_campaign', getById);

// Tạo một chiến dịch mới
router.post('/', create);

// Cập nhật một chiến dịch
router.put('/', update);

// Lấy campaign yêu thích của 1 player
router.get('/like/:id_player', getPlayerFavorite);

//Lấy tất cả campaign có thể đổi thưởng bằng coin
router.get('/type/coin', getRedeemableByCoin);

//Lấy tất cả campaign có thể đổi thưởng bằng item
router.get('/type/item', getRedeemableByItem);

// Yêu thích campaign
router.post('/like', like);

// Bỏ yêu thích campaign
router.post('/unlike', unlike);

module.exports = router;
