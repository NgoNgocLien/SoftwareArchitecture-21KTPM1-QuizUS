const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');
const PlayerGame = require('../models/playerGame');
const Voucher = require('../models/voucher');
const TurnRequest = require('../models/turnRequest');

// Tìm kiếm game theo campaign
router.get('/campaign/:id_campaign', async (req, res) => {
  try {
    if (!req.params.id_campaign) {
      return res.status(400).json({ message: 'id_campaign is required' });
    }

    const campaign = await Campaign.findById(req.params.id_campaign).populate('id_quiz');
    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
    } else{
      res.status(200).json(campaign);
    }
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// lấy tất cả mảnh ghép (item) của người chơi
router.get('/item/:id_player', async (req, res) => {
  try {
    const id_player = req.params.id_player;
    
    if (!id_player) {
      return res.status(400).json({ message: 'id_player is required' });
    }

    const playerGames = await PlayerGame.find({ id_player }).populate({
      path: 'id_campaign',
      populate: {
        path: 'id_voucher',
        model: 'Voucher'
      }
    });
    
    if (!playerGames || playerGames.length === 0) {
      return res.status(404).json({ message: 'No games found for this player.' });
    }

    const currentTime = new Date();

    const result = playerGames
      .filter(playerGame => {
        const campaign = playerGame.id_campaign;
        return campaign.start_datetime <= currentTime && campaign.end_datetime >= currentTime;
      })
      .map(playerGame => {
        const campaign = playerGame.id_campaign;
        const voucher = campaign.id_voucher;
        return {
          id_campaign: campaign._id,
          name: campaign.name,
          photo: campaign.photo,
          item1_photo: campaign.item1_photo,
          quantity_item1: playerGame.quantity_item1,
          item2_photo: campaign.item2_photo,
          quantity_item2: playerGame.quantity_item2,
          start_datetime: campaign.start_datetime,
          end_datetime: campaign.end_datetime,
          vouchers: voucher ? {
            id_voucher: voucher._id,
            code: voucher.code,
            qr_code: voucher.qr_code,
            photo: voucher.photo,
            price: voucher.price,
            description: voucher.description,
            expired_date: voucher.expired_date,
            score_exchange: voucher.score_exchange,
            status: voucher.status
          } : null 
        };
      });
      res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// lưu kết quả chơi game của người chơi
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

// lấy lượt chơi còn lại của người chơi với 1 campaign
router.get('/player_turn/:id_player/:id_campaign', async (req, res) => {
  try {
    const { id_player, id_campaign } = req.params;

    if (!id_player || !id_campaign) {
      return res.status(400).json({ message: 'id_player, id_campaign are required' });
    }

    const playerGame = await PlayerGame.findOne({
      id_player: id_player,
      id_campaign: id_campaign,
    });

    if (!playerGame) {
      return res.status(404).json({ message: 'No campaign found for this player.' });
    }

    return res.status(200).json({ player_turn: playerGame.player_turn });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// thêm lượt chơi của 1 campaign với 1 người chơi
router.put('/player_turn/add', async (req, res) => {
  try {
    const { id_player, id_campaign } = req.body;

    if (!id_player || !id_campaign ) {
      return res.status(400).json({ message: 'id_player, id_campaign are required' });
    }

    const playerGame = await PlayerGame.findOne({ id_player, id_campaign });

    if (!playerGame) {
      return res.status(404).json({ message: 'Player game data not found for this campaign.' });
    }

    playerGame.player_turn += 1;
    await playerGame.save();

    return res.status(200).json({
      message: 'Player turns successfully added.',
      playerGame
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// giảm lượt chơi của 1 campaign với 1 người chơi
router.put('/player_turn/minus', async (req, res) => {
  try {
    const { id_player, id_campaign } = req.body;

    if (!id_player || !id_campaign ) {
      return res.status(400).json({ message: 'id_player, id_campaign are required' });
    }

    const playerGame = await PlayerGame.findOne({ id_player, id_campaign });

    if (!playerGame) {
      return res.status(404).json({ message: 'Player game data not found for this campaign.' });
    }

    if (playerGame.player_turn < 1) {
      return res.status(400).json({ message: 'Not enough player turns to reduce.' });
    }

    playerGame.player_turn -= 1;
    await playerGame.save();

    return res.status(200).json({
      message: 'Player turns successfully reduced.',
      playerGame
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// xin lượt chơi từ bạn bè cho 1 campaign
router.post('/player_turn/send', async (req, res) => {
  try {
    const { id_sender, id_receiver, id_campaign } = req.body;

    if (!id_sender || !id_receiver || !id_campaign) {
      return res.status(400).json({ message: 'id_sender, id_receiver, and id_campaign are required' });
    }

    const playerGame = await PlayerGame.findOne({
      id_player: id_receiver,
      id_campaign: id_campaign
    });

    if (!playerGame) {
      return res.status(404).json({ message: 'Receiver is not participating in this campaign.' });
    }

    // Tạo bản ghi mới trong TurnRequest (Lưu thông tin xin lượt chơi)
    const turnRequest = new TurnRequest({
      id_sender,
      id_receiver,
      id_campaign,
      request_time: new Date(),
      accept_time: null
    });

    const savedTurnRequest = await turnRequest.save();

    return res.status(201).json({
      message: 'Turn request sent.',
      turnRequest: savedTurnRequest,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// người chơi chấp nhận cho bạn bè lượt chơi
router.put('/player_turn/receive', async (req, res) => {
  try {
    const { id_request } = req.body;

    if (!id_request) {
      return res.status(400).json({ message: 'id_request are required' });
    }

    const turnRequest = await TurnRequest.findById(id_request);

    if (!turnRequest) {
      return res.status(404).json({ message: 'Turn request not found.' });
    }

    const { id_sender, id_receiver, id_campaign } = turnRequest;

    const receiverGame = await PlayerGame.findOne({
      id_player: id_receiver,
      id_campaign: id_campaign
    });

    if (!receiverGame || receiverGame.player_turn < 1) {
      return res.status(400).json({ message: 'Receiver has insufficient player turns.' });
    }

    let senderGame = await PlayerGame.findOne({
      id_player: id_sender,
      id_campaign: id_campaign
    });

    senderGame.player_turn += 1;
    receiverGame.player_turn -= 1;
    turnRequest.accept_time = new Date();

    await receiverGame.save();
    await senderGame.save();
    await turnRequest.save();

    return res.status(200).json({
      message: 'Player turn successfully transferred.',
      sender: { id_sender, player_turn: senderGame.player_turn },
      receiver: { id_receiver, player_turn: receiverGame.player_turn },
      turnRequest
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
