const express = require('express');
const router = express.Router();
const axios = require('axios');
const Campaign = require('../models/campaign');
const PlayerLikeCampaign = require('../models/playerLikeCampaign');
const PlayerGame = require('../models/playerGame');
const {
    getAll,
    getInProgress,
    getIncoming,
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
    getStats,
    getPlayerStats, 
    getBudgetStatsByField,
    getEventStatsByField,
    getBrandStats, getBrandPlayerStats, 
    getBrandBudgetStats, getEventStats
} = require('../controllers/campaignController');

// Lấy tất cả các chiến dịch
router.get('/', getAll);

// Lấy tất cả các chiến dịch đang diễn ra
router.get('/in_progress', getInProgress);

// Lấy tất cả các chiến dịch sắp diễn ra
router.get('/incoming', getIncoming);

//Lấy thông số từ database
router.get('/stats', getStats);

//Lấy thống kê của brand dashboard
router.get('/brandStats/:id_brand', getBrandStats);

// Lấy tất cả các chiến dịch của một brand theo id_brand
router.get('/brand/:id_brand', getBrandCampaign);

// Tìm kiếm chiến dịch
router.get('/search/:keyword', search);

//lấy tẩt cả campaign của 1 voucher
router.get('/search/voucher/:id_voucher', getCampaignsOfVoucher);

// Tìm kiếm chiến dịch của một brand
router.get('/search/:id_brand/:keyword', searchByBrand);

// Thống kê số lượng người chơi đăng ký/ tham gia sự kiện/ trao đổi vật phẩm từ đầu năm đến tháng gần nhất
router.get('/player', getPlayerStats);

// Thống kê số lượng người chơi đăng ký/ tham gia sự kiện/ trao đổi vật phẩm từ đầu năm đến tháng gần nhất
router.get('/brandPlayer/:id_brand', getBrandPlayerStats);

// Thống kê ngân sách đã sử dụng theo lĩnh vực từ đầu năm đến tháng hiện tại
router.get('/budget', getBudgetStatsByField);

// Thống kê ngân sách đã sử dụng của brand từ đầu năm đến tháng hiện tại
router.get('/brandBudget/:id_brand', getBrandBudgetStats);

// Thống kê tình trạng các sự kiện (đang diễn ra/sắp diễn ra/ đã kết thúc)
router.get('/event', getEventStatsByField);

// Thống kê tình trạng các sự kiện (đang diễn ra/sắp diễn ra/ đã kết thúc) của brand
router.get('/event/:id_brand', getEventStats);

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

// Thống kê ngân sách đã sử dụng theo lĩnh vực từ đầu năm đến tháng hiện tại
router.get('/budget')

module.exports = router;
