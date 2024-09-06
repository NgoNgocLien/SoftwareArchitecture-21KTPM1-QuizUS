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
            const campaign = await Campaign.findOne({ id_voucher: voucher._id });

            if (campaign && campaign.given_amount_voucher < campaign.max_amount_voucher) {
                return { voucher, campaign };
            }
            return null;
        }));

        const filteredVouchers = activeVouchersWithCampaigns.filter(item => item !== null);

        const result = await Promise.all(filteredVouchers.map(async (item) => {
            const id_brand1 = item.campaign.id_brand1;
            try {
                const brandResponse = await axios.get(`http://gateway_proxy:8000/user/api/brand/${id_brand1}`);
                return {
                    campaign: {
                        ...item.campaign._doc,
                        brandName: brandResponse.data.name,
                        brandLogo: brandResponse.data.logo,
                    },
                    voucher: item.voucher._doc
                };
            } catch (axiosError) {
                throw new Error("Failed to fetch brand information.");
            }
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Tìm kiếm voucher theo brand
router.get('/search/brand/:id_brand', async (req, res) => {
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
});

// Lấy tất cả voucher đã đổi của player
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
                        brandName: brandResponse.data.name,
                        brandLogo: brandResponse.data.logo
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
});

// đổi voucher
router.post('/exchange/coin', async (req, res) => {
  try {
      const { id_player, id_campaign, score_exchange } = req.body;

      if (!id_player || !id_campaign || !score_exchange) {
          return res.status(400).json({ message: 'id_player, id_campaign, and score_exchange are required' });
      }

      try {
          const response = await axios.put('http://gateway_proxy:8000/user/api/player/coin', {
              id_player,
              score: score_exchange
          });

          if (response.status === 200) {
              const playerVoucher = new PlayerVoucher({
                  id_player,
                  id_campaign,
                  is_used: false
              });

              const savedPlayerVoucher = await playerVoucher.save();
              return res.status(201).json(savedPlayerVoucher);
          } else {
              return res.status(500).json({ message: 'Failed to deduct coins from player.' });
          }

      } catch (error) {
          return res.status(500).json({ message: 'Failed to communicate with the coin deduction service.', error: error.message });
      }
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;