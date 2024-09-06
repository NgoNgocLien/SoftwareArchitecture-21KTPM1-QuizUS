const express = require('express');
const router = express.Router();
const axios = require('axios');
const Voucher = require('../models/voucher');
const PlayerVoucher = require('../models/playerVoucher');
const Campaign = require('../models/campaign');

// Lấy tất cả voucher đang hoạt động
router.get('/active', async (req, res) => {
    try {
        const vouchers = await Voucher.find({
            status: true,
            expired_date: { $gt: new Date() }
        });

        const activeVouchersWithCampaigns = await Promise.all(vouchers.map(async (voucher) => {
            // Find the campaign associated with the voucher
            const campaign = await Campaign.findOne({
                id_voucher: voucher._id
            });

            // If a valid campaign is found and given_amount_voucher < max_amount_voucher
            if (campaign && campaign.given_amount_voucher < campaign.max_amount_voucher) {
                return { voucher, campaign };
            }
            return null;  // Return null for vouchers without valid campaigns
        }));

        // Filter out null values (vouchers without valid campaigns)
        const _result = activeVouchersWithCampaigns.filter(item => item !== null);

        // Get brand info for each campaign
        const result = await Promise.all(_result.map(async (item) => {
            const id_brand1 = item.campaign.id_brand1;
            try {
                const brandResponse = await axios.get(`http://gateway_proxy:8000/user/api/brand/${id_brand1}`);
                console.log("brandResponse:", brandResponse.data);

                return {
                    campaign: {
                        ...item.campaign._doc,
                        brandName: brandResponse.data.name,
                        brandLogo: brandResponse.data.logo,
                    },
                    voucher: item.voucher._doc
                };
            } catch (axiosError) {
                // console.error("Error fetching brand info:", axiosError);
                throw new Error("Failed to fetch brand information.");
            }
        }));

        res.status(200).json(result);
    } catch (error) {
        // console.error('Error fetching active vouchers and campaigns:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Tìm kiếm voucher theo brand
router.get('/search/:id_brand', async (req, res) => {
    try {
        const vouchers = await Voucher.find({ id_brand: req.params.id_brand });
        res.status(200).json(vouchers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Tạo voucher
router.post('/', async (req, res) => {
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
});

// Cập nhật một voucher
router.put('/', async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.body._id);
        if (voucher) {
            voucher.id_brand = req.body.id_brand || voucher.id_brand;
            voucher.code = req.body.code || voucher.code;
            voucher.qr_code = req.body.qr_code || voucher.qr_code;
            voucher.photo = req.body.photo || voucher.photo;
            voucher.price = req.body.price || voucher.price;
            voucher.description = req.body.description || voucher.description;
            voucher.expired_date = req.body.expired_date || voucher.expired_date;
            voucher.score_exchange = req.body.score_exchange || voucher.score_exchange;
            voucher.status = req.body.status != null ? req.body.status : voucher.status;

            const updatedVoucher = await voucher.save();
            res.status(200).json(updatedVoucher);
        } else {
            res.status(404).json({ message: 'Voucher not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// lấy tất cả voucher đã đổi của player
router.get('/exchange/:id_player', async (req, res) => {
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
                        id_campaign: campaignInfo._id,
                        brandName: brandResponse.data.name,
                        brandLogo: brandResponse.data.logo
                    },
                    voucher: {
                        ...id_voucher._doc,
                        id_voucher: id_voucher._doc._id
                    },
                    is_used: playerVoucher.is_used
                };
            } catch (axiosError) {
                console.error("Error fetching brand info:", axiosError);
                throw new Error("Failed to fetch brand information.");
            }

        }));

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
