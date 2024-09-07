const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');
const PlayerGame = require('../models/playerGame');
const Voucher = require('../models/voucher');
const TurnRequest = require('../models/turnRequest');
const PlayerGift = require('../models/playerGift');

const {
  searchByCampaign,
  getAllItem,
  saveResult,
  getPlayerTurnByCampaign,
  addPlayerTurn,
  reducePlayerTurn,
  sendTurn,
  receiveTurn,
  sendItem,
  receiveItem,
} = require('../controllers/gameController');

// Tìm kiếm game theo campaign
router.get('/campaign/:id_campaign', searchByCampaign);

// lấy tất cả mảnh ghép (item) của người chơi
router.get('/item/:id_player', getAllItem);

// lưu kết quả chơi game của người chơi
router.post('/', saveResult);

// lấy lượt chơi còn lại của người chơi với 1 campaign
router.get('/player_turn/:id_player/:id_campaign', getPlayerTurnByCampaign);

// thêm lượt chơi của 1 campaign với 1 người chơi
router.put('/player_turn/add', addPlayerTurn);

// giảm lượt chơi của 1 campaign với 1 người chơi
router.put('/player_turn/minus', reducePlayerTurn);

// xin lượt chơi từ bạn bè cho 1 campaign
router.post('/player_turn/send', sendTurn);

// người chơi chấp nhận cho bạn bè lượt chơi
router.put('/player_turn/receive', receiveTurn);

// tặng mảnh ghép cho bạn
router.post('/item/send', sendItem);

// nhận mảnh ghép từ bạn
router.put('/item/receive', receiveItem);


module.exports = router;
