const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');
const PlayerLikeCampaign = require('../models/playerLikeCampaign');
const PlayerGame = require('../models/playerGame');
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
    const playerLikes = await PlayerLikeCampaign.findOne({ id_player: req.params.id_player }).populate('campaigns.id_campaign');
    
    if (!playerLikes) {
      return res.status(404).json({ message: 'No campaigns found for this player.' });
    }
    
    const result = playerLikes.campaigns.map(like => ({
      _id: like._id,
      campaign_data: like.id_campaign
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Lấy tất cả campaign có thể đổi thưởng bằng coin
router.get('/type/coin', async (req, res) => {
  try {
    const { score } = req.body; // Lấy điểm của người chơi từ BODY của request
    const currentTime = new Date();
    
    const redeemableCampaigns = await Campaign.find({
      score_award: { $lte: score }, 
      start_datetime: { $lte: currentTime }, // Campaign đã bắt đầu
      end_datetime: { $gte: currentTime } // Campaign chưa kết thúc
    });

    res.status(200).json(redeemableCampaigns);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error });
  }
});

//Lấy tất cả campaign có thể đổi thưởng bằng coin
router.get('/type/item', async (req, res) => {
  try {
    const { playerId } = req.body; // Lấy playerId từ body của request

    let NumItem1 = 1;
    let NumItem2 = 1;

    // Tìm tất cả các PlayerGame của người chơi đủ điều kiện đổi thưởng
    const playerGames = await PlayerGame.find({
      id_player: playerId,
      quantity_item1: { $gte: NumItem1 }, // Kiểm tra số lượng item1 >+ NumItem1
      quantity_item2: { $gte: NumItem2 }  // Kiểm tra số lượng item2 >= NumItem2(nếu cần tăng số lượng yêu cầu để đổi thì tăng 2 biến này)
    });

    const campaignIds = playerGames.map(game => game.id_campaign);
    const currentTime = new Date();

    // Tìm tất cả các campaign mà player có thể đổi thưởng dựa trên danh sách id_campaign và thời gian còn hiệu lực
    const redeemableCampaigns = await Campaign.find({
      _id: { $in: campaignIds }, // Chỉ lấy các campaign mà player đã sưu tầm đủ item
      start_datetime: { $lte: currentTime }, // Campaign đã bắt đầu
      end_datetime: { $gte: currentTime } // Campaign chưa kết thúc
    });

    res.status(200).json(redeemableCampaigns);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error });
  }
});

// Yêu thích campaign
router.post('/like', async (req, res) => {
  const { playerId, campaignId } = req.body;

  if (!playerId || !campaignId) {
    return res.status(400).json({ message: 'Player ID and Campaign ID are required.' });
  }

  try {
    let playerLike = await PlayerLikeCampaign.findOne({ id_player: playerId });

    if (!playerLike) {
      playerLike = new PlayerLikeCampaign({
        id_player: playerId,
        campaigns: [{ id_campaign: campaignId }]
      });
      await playerLike.save();
      return res.status(201).json(playerLike);
    }

    const campaignExists = playerLike.campaigns.some(campaign => campaign.id_campaign.toString() === campaignId);

    if (campaignExists) {
      return res.status(400).json({ message: 'Campaign already liked.' });
    }

    playerLike.campaigns.push({ id_campaign: campaignId });
    await playerLike.save();
    res.status(200).json(playerLike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bỏ yêu thích campaign
router.post('/unlike', async (req, res) => {
  const { playerId, campaignId } = req.body;

  if (!playerId || !campaignId) {
    return res.status(400).json({ message: 'Player ID and Campaign ID are required.' });
  }

  try {
    const playerLike = await PlayerLikeCampaign.findOne({ id_player: playerId });

    if (!playerLike) {
      return res.status(404).json({ message: 'No likes found for this player.' });
    }

    const campaignIndex = playerLike.campaigns.findIndex(campaign => campaign.id_campaign.toString() === campaignId);

    if (campaignIndex === -1) {
      return res.status(400).json({ message: 'Campaign not found in likes.' });
    }

    playerLike.campaigns.splice(campaignIndex, 1);
    await playerLike.save();
    res.json(playerLike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
