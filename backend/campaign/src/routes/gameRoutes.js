const express = require('express');
const router = express.Router();

const {
  searchByCampaign,
  getAllItem,
  saveResult,
  getPlayerTurnByCampaign,
  addPlayerTurn,
  reducePlayerTurn,
  requestTurn,
  replyTurn,
  sendItem,
  receiveItem,
  getTurnRequest,
  getItemRequest,
  seenTurnNoti,
  getPlayerCountByGameType
} = require('../controllers/gameController');

// Tìm kiếm game theo campaign
router.get('/campaign/:id_campaign', searchByCampaign);

// lấy tất cả mảnh ghép (item) của người chơi
router.get('/item/:id_player', getAllItem);

// Lấy số lượng người chơi theo loại trò chơi
router.get('/playerByGame', getPlayerCountByGameType);

// lưu kết quả chơi game của người chơi
router.post('/', saveResult);

// lấy các thông báo xin lượt chơi từ bạn bè
router.get('/player_turn/request/:id_player', getTurnRequest);

// lấy lượt chơi còn lại của người chơi với 1 campaign
router.get('/player_turn/:id_player/:id_campaign', getPlayerTurnByCampaign);

// thêm lượt chơi của 1 campaign với 1 người chơi
router.put('/player_turn/add', addPlayerTurn);

// giảm lượt chơi của 1 campaign với 1 người chơi
router.put('/player_turn/minus', reducePlayerTurn);

// xin lượt chơi từ bạn bè cho 1 campaign
router.post('/player_turn/request', requestTurn);

// người chơi từ chối / chấp nhận cho bạn bè lượt chơi -> noti socket
router.put('/player_turn/request', replyTurn);

// xem thông báo liên quan đến noti
router.put('/player_turn/seen', seenTurnNoti);

// tặng mảnh ghép cho bạn
router.post('/item/send', sendItem);

// lấy các thông báo tặng mảnh ghép từ bạn bè
router.get('/item/request/:id_player', getItemRequest);

// nhận mảnh ghép từ bạn
router.put('/item/receive', receiveItem);

module.exports = router;
