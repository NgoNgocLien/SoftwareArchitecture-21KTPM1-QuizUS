const axios = require('axios');
const Voucher = require('../models/voucher');
const PlayerVoucher = require('../models/playerVoucher');
const Campaign = require('../models/campaign');
const PlayerGame = require('../models/playerGame');
const VoucherGift = require('../models/voucherGift');
const playerNoti = require('../models/playerNoti');
  
// lấy thông báo gửi đến người dùng
const getAll = async (req, res) => {
    try {
        if (!req.params.id_player) {
            return res.status(400).json({ message: 'id_player is required' });
        }

        const playerNotis = await playerNoti.find({
            id_receiver: req.params.id_player
        }).sort({ noti_time: -1 });

        res.status(200).json(playerNotis);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const updateSeenTime = async (req, res) => {
    try {
        if (!req.params.id_player) {
            return res.status(400).json({ message: 'id_player is required' });
        }

        console.log(req.params.id_player)
        const result = await playerNoti.updateMany(
            {
                id_receiver: req.params.id_player,
                seen_time: null
            },
            {
                $set: { seen_time: Date.now() }
            }
        );

        res.status(200).json({ message: 'Seen time updated for notifications', updatedCount: result.nModified });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


module.exports = {
    getAll,
    updateSeenTime
}