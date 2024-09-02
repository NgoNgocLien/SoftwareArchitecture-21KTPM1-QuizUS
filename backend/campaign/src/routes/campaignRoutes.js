const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');
const PlayerLikeCampaign = require('../models/playerLikeCampaign');
// Lấy tất cả các chiến dịch
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy tất cả các chiến dịch đang diễn ra
router.get('/in_progress', async (req, res) => {
  try {
    const now = new Date();
    const campaigns = await Campaign.find({
      start_datetime: { $lte: now },
      end_datetime: { $gte: now }
    });
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy tất cả các chiến dịch của một brand theo id_brand
router.get('/brand/:id_brand', async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      $or: [{ id_brand1: req.params.id_brand }, { id_brand2: req.params.id_brand }]
    });
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tìm kiếm chiến dịch
router.get('/search/:keyword', async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      name: new RegExp(req.params.keyword, 'i')
    });
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tìm kiếm chiến dịch của một brand
router.get('/search/:id_brand/:keyword', async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      $and: [
        { $or: [{ id_brand1: req.params.id_brand }, { id_brand2: req.params.id_brand }] },
        { name: new RegExp(req.params.keyword, 'i') }
      ]
    });
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy thông tin của một chiến dịch
router.get('/id/:id_campaign', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id_campaign);
    if (campaign) {
      res.status(200).json(campaign);
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tạo một chiến dịch mới
router.post('/', async (req, res) => {
  try {
    const newCampaign = new Campaign({
      id_brand1: req.body.id_brand1,
      id_brand2: req.body.id_brand2,
      name: req.body.name,
      photo: req.body.photo,
      start_datetime: req.body.start_datetime,
      end_datetime: req.body.end_datetime,
      id_voucher: req.body.id_voucher,
      max_amount_voucher: req.body.max_amount_voucher,
      given_amount_voucher: req.body.given_amount_voucher,
      id_quiz: req.body.id_quiz,
      item1_photo: req.body.item1_photo,
      item2_photo: req.body.item2_photo,
      score_award: req.body.score_award
    });

    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật một chiến dịch
router.put('/', async (req, res) => {
  try {
    const { _id } = req.body; 

    if (!_id) {
      return res.status(400).json({ message: '_id is required' });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      _id,
      {
        id_brand1: req.body.id_brand1,
        id_brand2: req.body.id_brand2,
        name: req.body.name,
        photo: req.body.photo,
        start_datetime: req.body.start_datetime,
        end_datetime: req.body.end_datetime,
        id_voucher: req.body.id_voucher,
        max_amount_voucher: req.body.max_amount_voucher,
        given_amount_voucher: req.body.given_amount_voucher,
        id_quiz: req.body.id_quiz,
        item1_photo: req.body.item1_photo,
        item2_photo: req.body.item2_photo,
        score_award: req.body.score_award
      },
      { new: true, runValidators: true } 
    );

    if (!updatedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy campaign yêu thích của 1 player
router.get('/like/:id_player', async (req, res) => {
  try {
    const campaigns = await PlayerLikeCampaign.find()
    // const campaigns = await PlayerLikeCampagin.find(
    //   {
    //     id_player: req.params.id_player,
    //   },
    // );
    console.log(req.params.id_player)
    res.json(campaigns);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
