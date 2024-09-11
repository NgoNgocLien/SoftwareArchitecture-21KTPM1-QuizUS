const axios = require('axios');
const cron = require('node-cron');
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
            id_receiver: req.params.id_player,
            noti_time: { $lt: new Date() } 
        }).sort({ noti_time: -1 });

        res.status(200).json(playerNotis);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// cập nhật xem hết thông báo chưa xem
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

// thông báo đến người dùng
const URL = 'http://10.0.1.35:8004/emit-notification'
const notify = (data) => {
    return axios.post(URL, {
        noti: data
    });
}

const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
};

cron.schedule('*/1 * * * *', async () => {
    console.log('Running daily notification task');

    try {
        // get all noti from PlayerNoti that noti_time = now (just compare day month year)
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        // Fetch notifications from the database that are scheduled for today
        const notifications = await playerNoti.find({
            type:'campaign',
            noti_time: {
                $gte: now,
                $lt: new Date(now.getTime() + 24 * 60 * 60 * 1000) // Up to midnight the next day
            }
        });

        console.log(notifications)

        for (const noti of notifications) {
            await notify({
                id_receiver: noti.id_receiver,
                content: noti.content,
                type: noti.type,
                id_campaign: noti.id_campaign,
                start_time: noti.start_time,
                noti_time: noti.noti_time
            });
        }

        // call notify function to pass noti as data

        console.log('Daily notifications sent successfully');
    } catch (error) {
        console.error('Error sending daily notifications:', error.message);
    }
}, {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh" // Set your timezone as needed
});


module.exports = {
    getAll,
    updateSeenTime,
    notify
}