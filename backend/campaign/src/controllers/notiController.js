const axios = require('axios');
const cron = require('node-cron');
const Voucher = require('../models/voucher');
const PlayerVoucher = require('../models/playerVoucher');
const Campaign = require('../models/campaign');
const PlayerGame = require('../models/playerGame');
const VoucherGift = require('../models/voucherGift');
const playerNoti = require('../models/playerNoti');
  
const noti_url = '10.126.0.158:8004'

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
const URL = `http://${noti_url}/emit-notification`;
const notify = (data) => {
    return axios.post(URL, {
        noti: data // Ensure 'data' has the correct structure expected by the server
    }).then(() => {
        console.log("Notification sent successfully!");
    }).catch((error) => {
        console.error("Failed to send notification:", error.message);
        console.error("Error details:", error.response?.data);
    });
};

const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
};

// cron.schedule('*/1 * * * *', async () => {
//     console.log('Running daily notification task');

//     try {
//         // get all noti from PlayerNoti that noti_time = now (just compare day month year)
//         const notifications = await playerNoti.find({
//             type: 'campaign'
//         });

//         const result = notifications.filter(noti => isSameDay(new Date(noti.noti_time), new Date(Date.now())))

//         console.log(result)

//         if (result) {
//             await notify({
//                 type: 'campaign'
//             });
//         }

//         // call notify function to pass noti as data

//         console.log('Daily notifications sent successfully');
//     } catch (error) {
//         console.error('Error sending daily notifications:', error.message);
//     }
// }, {
//     scheduled: true,
//     timezone: "Asia/Ho_Chi_Minh" // Set your timezone as needed
// });


module.exports = {
    getAll,
    updateSeenTime,
    notify
}