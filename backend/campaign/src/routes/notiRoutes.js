const express = require('express');
const router = express.Router();
const {
    getAll, updateSeenTime
} = require('../controllers/notiController');

// lấy tất cả thông báo đến người dùng
router.get('/:id_player', getAll)

// đánh dấu đã đọc với tất cả thông báo
router.put('/:id_player/seen_time', updateSeenTime)

const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
};
const playerNoti = require('../models/playerNoti');

router.get('test', async (req,res) => {
    try{
        const notifications = await playerNoti.find();

        const result = notifications.filter(noti => isSameDay(new Date(noti.noti_time), Date.now()))
        res.status(200).send({notifications})
    } catch(e){
        console.log(e);
        res.status(500).send('Server Error');
        return;
    }
})

module.exports = router;