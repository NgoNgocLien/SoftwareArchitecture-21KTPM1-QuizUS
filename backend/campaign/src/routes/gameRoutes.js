const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const Campaign = require('../models/campaign');
const PlayerGame = require('../models/playerGame');

// Tìm kiếm game theo campaign
router.get('/campaign/:id_campaign', async (req, res) => {
  try {
    if (!req.params.id_campaign) {
      return res.status(400).json({ message: 'id_campaign is required' });
    }

    const campaign = await Campaign.findById(req.params.id_campaign).populate('id_quiz');;
    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
    } else{
      res.status(200).json(campaign);
    }
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// lưu kết quả chơi game của người dùng
router.post('/', async (req, res) => {
  try {
    if (!req.body.id_player ||!req.body.id_campaign) {
      return res.status(400).json({ message: 'id_player, id_campaign are required' });
    }

    const playerGame = await PlayerGame.findOne({
      id_player: req.body.id_player,
      id_campaign: req.body.id_campaign,
    })

    if (!playerGame){
      const newPlayerGame = new PlayerGame({
        id_player: req.body.id_player,
        id_campaign: req.body.id_campaign,
        player_turn: 2,
        quantity_item1: req.body.isItem1 ? 1 : 0,
        quantity_item2: req.body.isItem2 ? 1 : 0,
      });
  
      const savedPlayerGame = await newPlayerGame.save();
      res.status(201).json(savedPlayerGame);
    } else{
      playerGame.player_turn -= 1;

      if (req.body.isItem1) {
        playerGame.quantity_item1 = (playerGame.quantity_item1 || 0) + 1;
      }
      if (req.body.isItem2) {
        playerGame.quantity_item2 = (playerGame.quantity_item2 || 0) + 1;
      }

      const savedPlayerGame = await playerGame.save();
      return res.status(201).json(savedPlayerGame);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
