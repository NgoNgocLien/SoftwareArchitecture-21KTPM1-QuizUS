const express = require('express');
const router = express.Router();
const {
    getAll, updateSeenTime
} = require('../controllers/notiController');

// lấy tất cả thông báo đến người dùng
router.get('/:id_player', getAll)

// đánh dấu đã đọc với tất cả thông báo
router.put('/:id_player/seen_time', updateSeenTime)

module.exports = router;