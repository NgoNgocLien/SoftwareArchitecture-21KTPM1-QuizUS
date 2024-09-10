const axios = require('axios');
const Voucher = require('../models/voucher');
const PlayerVoucher = require('../models/playerVoucher');
const Campaign = require('../models/campaign');
const PlayerGame = require('../models/playerGame');
const campaign = require('../models/campaign');

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

        const campaign = await Campaign.findById(id_campaign);
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

        const campaign = await Campaign.findById(id_campaign);
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
        await campaign.save();

        return res.status(201).json({
            playerVoucher: savedPlayerVoucher,
            message: 'Voucher exchange successful, items deducted, and campaign updated.'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Sử dụng voucher
const use = async (req, res) => {
    try {
        const { id_player, id_campaign } = req.params;

        if (!id_player || !id_campaign) {
            return res.status(400).json({ message: 'id_player and id_campaign are required' });
        }

        const playerVoucher = await PlayerVoucher.findOne({ id_player, id_campaign });

        if (!playerVoucher) {
            return res.status(404).json({ message: 'Voucher not found for this player.' });
        }

        if (playerVoucher.is_used) {
            return res.status(400).json({ message: 'This voucher has already been used.' });
        }

        playerVoucher.is_used = true;
        await playerVoucher.save();

        return res.status(200).json({
            message: 'Voucher successfully used.',
            playerVoucher
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



module.exports = {
    getActive,
    searchByBrand,
    create,
    update,
    getExchanged,
    exchangeByCoin,
    exchangeByItem,
    use,
};