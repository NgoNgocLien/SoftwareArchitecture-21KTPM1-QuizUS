const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');

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
  const campaign = new Campaign({
    id_brand1: req.body.id_brand1,
    id_brand2: req.body.id_brand2,
    name: req.body.name,
    photo: req.body.photo,
    start_datetime: req.body.start_datetime,
    end_datetime: req.body.end_datetime
  });

  try {
    const newCampaign = await campaign.save();
    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật một chiến dịch
router.put('/', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.body._id);
    if (campaign) {
      campaign.id_brand1 = req.body.id_brand1 || campaign.id_brand1;
      campaign.id_brand2 = req.body.id_brand2 || campaign.id_brand2;
      campaign.name = req.body.name || campaign.name;
      campaign.photo = req.body.photo || campaign.photo;
      campaign.start_datetime = req.body.start_datetime || campaign.start_datetime;
      campaign.end_datetime = req.body.end_datetime || campaign.end_datetime;

      const updatedCampaign = await campaign.save();
      res.status(200).json(updatedCampaign);
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
