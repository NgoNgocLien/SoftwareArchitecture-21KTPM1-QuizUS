const axios = require('axios');
const Voucher = require('../models/voucher');
const PlayerVoucher = require('../models/playerVoucher');
const Campaign = require('../models/campaign');
const PlayerGame = require('../models/playerGame');
const campaign = require('../models/campaign');
const VoucherGift = require('../models/voucherGift');
const PlayerNoti = require('../models/playerNoti');

const { notify } = require('../controllers/notiController')

// Lấy tất cả voucher đang hoạt động
const getActive = async (req, res) => {
    try {

        const campaigns = await Campaign.find().populate('id_voucher');
        const activeCampaigns = campaigns.filter(campaign => campaign.end_datetime > new Date() && campaign.start_datetime < new Date());

        if (!activeCampaigns || activeCampaigns.length === 0) {
            return res.status(200).json([]);
        }

        const vouchers = activeCampaigns.map(campaign => {
            const { id_voucher, ...rest } = campaign._doc;
            if (campaign.id_quiz) {
                return { ...id_voucher._doc, type: "quizgame", campaign: rest };
            } else {
                return { ...id_voucher._doc, type: "itemgame", campaign: rest };
            }
        }).filter(voucher => voucher.status && voucher.expired_date > new Date());

        const result = await Promise.all(vouchers.map(async (item) => {
            const id_brand = item.id_brand;
            try {
                const brandResponse = await axios.get(`http://gateway_proxy:8000/user/api/brand/${id_brand}`);
                const { campaign, ...rest } = item;
                return {
                    campaign: {
                        ...item.campaign,
                        brandName: brandResponse.data.name,
                        brandLogo: brandResponse.data.logo,
                        brandField: brandResponse.data.field,
                    },
                    ...rest
                };
            } catch (axiosError) {
                throw new Error("Failed to fetch brand information.");
            }
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id_voucher);

        if (voucher) {
            try {
                const brandResponse = await axios.get(`http://gateway_proxy:8000/user/api/brand/${voucher.id_brand}`);
                const brand = brandResponse.data;

                const result = {
                    ...voucher._doc,
                    brand: {
                        ...brand
                    }
                }

                res.status(200).json(result);
            } catch (axiosError) {
                throw new Error("Failed to fetch brand information.");
            }
        } else {
            res.status(404).json({ message: 'Voucher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Tìm kiếm voucher theo brand
const searchByBrand = async (req, res) => {
    try {
        const vouchers = await Voucher.find({ id_brand: req.params.id_brand });
        res.status(200).json(vouchers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Tạo voucher
const create = async (req, res) => {
    const voucher = new Voucher({
        name: req.body.name,
        id_brand: req.body.id_brand,
        code: req.body.code,
        qr_code: req.body.qr_code,
        photo: req.body.photo,
        price: req.body.price,
        description: req.body.description,
        expired_date: req.body.expired_date,
        score_exchange: req.body.score_exchange,
        status: req.body.status
    });

    try {
        const newVoucher = await voucher.save();
        res.status(201).json(newVoucher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Cập nhật một voucher
const update = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.body._id);
        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }

        Object.assign(voucher, {
            id_brand: req.body.id_brand || voucher.id_brand,
            code: req.body.code || voucher.code,
            qr_code: req.body.qr_code || voucher.qr_code,
            photo: req.body.photo || voucher.photo,
            price: req.body.price || voucher.price,
            description: req.body.description || voucher.description,
            expired_date: req.body.expired_date || voucher.expired_date,
            score_exchange: req.body.score_exchange || voucher.score_exchange,
            status: req.body.status != null ? req.body.status : voucher.status
        });

        const updatedVoucher = await voucher.save();
        res.status(200).json(updatedVoucher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Lấy tất cả voucher đã đổi của player
const getExchanged = async (req, res) => {
    try {
        const id_player = req.params.id_player;
        if (!id_player) {
            return res.status(400).json({ message: 'id_player is required' });
        }

        const playerVouchers = await PlayerVoucher.find({ id_player })
            .populate({
                path: 'id_campaign',
                populate: {
                    path: 'id_voucher'
                }
            });

        if (!playerVouchers || playerVouchers.length === 0) {
            return res.status(404).json({ message: 'No vouchers found for this player.' });
        }

        const result = await Promise.all(playerVouchers.map(async (playerVoucher) => {
            const { id_voucher, ...campaignInfo } = playerVoucher.id_campaign._doc;

            try {
                const brandResponse = await axios.get(`http://gateway_proxy:8000/user/api/brand/${campaignInfo.id_brand1}`);
                return {
                    id_playerVoucher: playerVoucher._id,
                    campaign: {
                        ...campaignInfo,
                        brandName: brandResponse.data.name,
                        brandLogo: brandResponse.data.logo,
                    },
                    voucher: id_voucher?._doc || '',
                    is_used: playerVoucher.is_used
                };
            } catch (axiosError) {
                throw new Error("Failed to fetch brand information ", axiosError);
            }
        }));

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// đổi voucher bằng xu
const exchangeByCoin = async (req, res) => {
    try {
        const { id_player, id_campaign, score_exchange } = req.body;

        if (!id_player || !id_campaign || !score_exchange) {
            return res.status(400).json({ message: 'id_player, id_campaign, and score_exchange are required' });
        }

        const campaign = await Campaign.findById(id_campaign).populate('id_voucher');
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found.' });
        }

        // Kiểm tra số lượng voucher đã phát có còn dưới mức tối đa không
        if (campaign.given_amount_voucher >= campaign.max_amount_voucher) {
            return res.status(400).json({ message: 'No more vouchers available for this campaign.' });
        }

        // Gọi API để trừ xu của người chơi
        try {
            const response = await axios.put('http://gateway_proxy:8000/user/api/player/coin', {
                id_player,
                score: score_exchange
            });

            if (response.status === 200) {
                // Tạo mới một bản ghi trong bảng PlayerVoucher
                const playerVoucher = new PlayerVoucher({
                    id_player,
                    id_campaign,
                    is_used: false
                });

                const savedPlayerVoucher = await playerVoucher.save();

                // Cập nhật giá trị given_amount_voucher của campaign
                campaign.given_amount_voucher += 1;
                await campaign.save();

                // Thêm noti
                const newNoti = new PlayerNoti({
                    type: "voucher",
                    subtype: null,
                    id_receiver: id_player,
                    id_voucher: campaign.id_voucher._id,
                    name_voucher: campaign.id_voucher.name,
                    is_used: false,
                    noti_time: new Date(),
                    seen_time: null
                });

                await newNoti.save();

                const noti = {
                    type: newNoti.type,
                    subtype: newNoti.subtype,
                    id_receiver: newNoti.id_receiver,
                    id_voucher: newNoti.id_voucher,
                    name_voucher: newNoti.name_voucher,
                    is_used: newNoti.is_used,
                    noti_time: newNoti.noti_time,
                    seen_time: newNoti.seen_time
                }

                await notify(noti);

                return res.status(201).json({
                    playerVoucher: savedPlayerVoucher,
                    message: 'Voucher exchange successful, voucher has been saved.'
                });
            } else {
                return res.status(500).json({ message: 'Failed to deduct coins from player.' });
            }

        } catch (error) {
            return res.status(500).json({ message: 'Failed to communicate with the user service.', error: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// đổi voucher bằng mảnh ghép
const exchangeByItem = async (req, res) => {
    try {
        const { id_player, id_campaign, id_voucher } = req.body;

        if (!id_player || !id_campaign || !id_voucher) {
            return res.status(400).json({ message: 'id_player, id_campaign, and id_voucher are required' });
        }

        const playerGame = await PlayerGame.findOne({ id_player, id_campaign });

        if (!playerGame) {
            return res.status(404).json({ message: 'Player game data not found.' });
        }

        // Kiểm tra quantity_item1 và quantity_item2 có đủ điều kiện không
        if (playerGame.quantity_item1 < 1 || playerGame.quantity_item2 < 1) {
            return res.status(400).json({ message: 'Insufficient items to exchange for voucher.' });
        }

        const campaign = await Campaign.findById(id_campaign).populate('id_voucher');
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found.' });
        }

        // Kiểm tra nếu số lượng given_amount_voucher đã đạt tối đa
        if (campaign.given_amount_voucher >= campaign.max_amount_voucher) {
            return res.status(400).json({ message: 'All vouchers have been redeemed for this campaign.' });
        }

        // Tạo bản ghi mới trong PlayerVoucher
        const playerVoucher = new PlayerVoucher({
            id_player,
            id_campaign,
            is_used: false
        });

        const savedPlayerVoucher = await playerVoucher.save();
        playerGame.quantity_item1 -= 1;
        playerGame.quantity_item2 -= 1;
        await playerGame.save();

        campaign.given_amount_voucher += 1;

        // console.log(campaign)
        await campaign.save();

        // Thêm noti
        const newNoti = new PlayerNoti({
            type: "voucher",
            subtype: null,
            id_receiver: id_player,
            id_voucher: campaign.id_voucher._id,
            name_voucher: campaign.id_voucher.name,
            is_used: false,
            noti_time: new Date(),
            seen_time: null
        });

        await newNoti.save();

        const noti = {
            type: newNoti.type,
            subtype: newNoti.subtype,
            id_receiver: newNoti.id_receiver,
            id_voucher: newNoti.id_voucher,
            name_voucher: newNoti.name_voucher,
            is_used: newNoti.is_used,
            noti_time: newNoti.noti_time,
            seen_time: newNoti.seen_time
        }

        await notify(noti);

        return res.status(201).json({
            playerVoucher: savedPlayerVoucher,
            message: 'Voucher exchange successful, items deducted, and campaign updated.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Sử dụng voucher
const use = async (req, res) => {
    try {
        const { id_playerVoucher } = req.params;

        if (!id_playerVoucher) {
            return res.status(400).json({ message: 'id_playerVoucher is required' });
        }

        const playerVoucher = await PlayerVoucher.findOne({ _id: id_playerVoucher })
            .populate({
                path: 'id_campaign',
                populate: {
                    path: 'id_voucher',
                    model: 'Voucher'
                }
            });

        if (!playerVoucher) {
            return res.status(404).json({ message: 'Voucher not found for this player.' });
        }

        if (playerVoucher.is_used) {
            return res.status(400).json({ message: 'This voucher has already been used.' });
        }

        playerVoucher.is_used = true;
        await playerVoucher.save();

        // Thêm noti
        //  const newNoti = new PlayerNoti({
        //     type: "voucher",
        //     subtype: null,
        //     id_receiver: playerVoucher.id_player,
        //     id_voucher: playerVoucher.id_campaign.id_voucher._id,
        //     name_voucher: playerVoucher.id_campaign.id_voucher.name,
        //     is_used: true,
        //     noti_time: new Date(),
        //     seen_time: null
        // });

        // await newNoti.save();

        // const noti = {
        //     type: newNoti.type,
        //     subtype: newNoti.subtype,
        //     id_receiver: newNoti.id_receiver,
        //     id_voucher: newNoti.id_voucher,
        //     name_voucher: newNoti.name_voucher,
        //     is_used: newNoti.is_used,
        //     noti_time: newNoti.noti_time,
        //     seen_time: newNoti.seen_time
        // }

        // await notify(noti);

        return res.status(200).json({
            message: 'Voucher successfully used.',
            playerVoucher
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// tặng voucher cho bạn
const sendVoucher = async (req, res) => {
    try {
        const { id_sender_voucher, id_receiver } = req.body;

        if (!id_sender_voucher || !id_receiver) {
            return res.status(400).json({ message: 'id_sender_voucher and id_receiver are required' });
        }

        const senderVoucher = await PlayerVoucher.findById(id_sender_voucher);
        console.log("senderVoucher: ", sendVoucher)
        // Kiểm tra voucher đã sd hay chưa
        if (senderVoucher.is_used) {
            return res.status(400).json({ message: 'This voucher has been already used!' });
        }

        senderVoucher.is_used = true;
        await senderVoucher.save();
        console.log("senderVoucher1: ", sendVoucher)
        // Tạo bản ghi mới trong PlayerVoucher để lưu thông tin voucher cho người nhận
        const receiverVoucher = new PlayerVoucher({
            id_player: id_receiver,
            id_campaign: senderVoucher.id_campaign,
            is_used: false
        });
        await receiverVoucher.save();
        console.log("receiverVoucher: ", receiverVoucher)
        // Tạo bản ghi mới trong VoucherGift để lưu thông tin voucher đã tặng
        const newVoucherGift = new VoucherGift({
            id_sender: senderVoucher.id_player,
            id_receiver,
            id_playervoucher: receiverVoucher._id,
            gift_time: new Date()
        });

        await newVoucherGift.save();
        console.log("newVoucherGift: ", newVoucherGift)

        // lấy thông tin sender
        const senderResponse = await axios.get(`http://gateway_proxy:8000/user/api/player/${senderVoucher.id_player}`);
        const sender = senderResponse.data;

        // lấy thông tin campaign
        const campaignResponse = await axios.get(`http://gateway_proxy:8000/campaign/api/campaign/${senderVoucher.id_campaign}`);
        const campaign = campaignResponse.data;

        // lấy thông tin voucher
        const voucherResponse = await axios.get(`http://gateway_proxy:8000/campaign/api/voucher/${campaign.id_voucher}`);
        const voucher = voucherResponse.data;

        // Thêm noti
        const newNoti = new PlayerNoti({
            type: "friend",
            subtype: "voucher",
            id_receiver,
            id_sender: senderVoucher.id_player,
            name_sender: sender.username,
            id_voucher: campaign.id_voucher,
            name_voucher: voucher.name,
            id_vouchergift: newVoucherGift._id,
            noti_time: new Date(),
            seen_time: null
        });

        await newNoti.save();

        const noti = {
            type: newNoti.type,
            subtype: newNoti.subtype,
            id_receiver: newNoti.id_receiver,
            id_sender: newNoti.id_sender,
            name_sender: newNoti.name_sender,
            id_voucher: newNoti.id_voucher,
            name_voucher: newNoti.name_voucher,
            id_vouchergift: newNoti.id_vouchergift,
            noti_time: newNoti.noti_time,
            seen_time: newNoti.seen_time
        }

        await notify(noti);

        return res.status(201).json({
            message: 'Voucher successfully sent!',
            gift: newVoucherGift
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Thống kê tình trạng voucher (đã sd/ chưa sd/ hết hạn/ tổng gtri)
const getStats = async (req, res) => {
    const campaigns = await Campaign.find().populate('id_voucher');

    if (!campaigns || campaigns.length === 0) {
        return res.status(404).json({ message: 'No campaigns found.' });
    }

    let totalVoucherCount = 0; // Tổng số lượng voucher thực tế phát hành
    let usedVoucherCount = 0;
    let unusedVoucherCount = 0;
    let expiredVoucherCount = 0;
    let totalVoucherValue = 0;

    for (const campaign of campaigns) {
        const voucher = await Voucher.findById(campaign.id_voucher);

        // Nếu không có voucher cho campaign, bỏ qua
        if (!voucher) {
            continue;
        }

        // Số lượng voucher thực tế đã phát hành (given_amount_voucher)
        const issuedVoucherCount = campaign.given_amount_voucher;
        totalVoucherCount += issuedVoucherCount;

        totalVoucherValue += campaign.max_amount_voucher * voucher.price;

        // Kiểm tra voucher đã hết hạn chưa
        if (voucher.expired_date < new Date()) {
            expiredVoucherCount += issuedVoucherCount;
        }

        // Tìm số lượng voucher đã sử dụng từ bảng PlayerVoucher
        const usedPlayerVouchers = await PlayerVoucher.find({
            id_campaign: campaign._id,
            is_used: true
        });

        // Tìm số lượng voucher đã sử dụng từ bảng PlayerVoucher
        const unusedPlayerVouchers = await PlayerVoucher.find({
            id_campaign: campaign._id,
            is_used: false
        });

        const giftedVouchers = await VoucherGift.find({
            id_playervoucher: { $in: unusedPlayerVouchers.map(v => v._id) }
        }).distinct('id_playervoucher');

        // Tính số lượng voucher đã sử dụng thật sự (không bao gồm voucher đã tặng)
        const actualUsedVouchers = usedPlayerVouchers.length - giftedVouchers.length;
        usedVoucherCount += actualUsedVouchers;

        // Số lượng voucher chưa sử dụng = đã phát hành - đã sử dụng
        const notUsedCount = issuedVoucherCount - actualUsedVouchers;
        unusedVoucherCount += notUsedCount;
    }

    // Trả về kết quả thống kê
    return res.status(200).json({
        total_vouchers: totalVoucherCount,
        used_vouchers: usedVoucherCount,
        unused_vouchers: unusedVoucherCount,
        expired_vouchers: expiredVoucherCount,
        total_value: totalVoucherValue
    });
}

module.exports = {
    getActive,
    getVoucherById,
    searchByBrand,
    create,
    update,
    getExchanged,
    exchangeByCoin,
    exchangeByItem,
    use, sendVoucher,
    getStats
};