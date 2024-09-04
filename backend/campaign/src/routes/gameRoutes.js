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

// const fs = require("fs");
// const path = require("path");
// const speechFile = path.resolve("./speech.mp3");
// const OpenAI = require("openai");
// const openai = new OpenAI({apiKey: process.env.GPT_API_KEY});
// router.post('/tts', async (req, res) => {
//   const { text } = req.body;

//   if (!text) {
//     return res.status(400).json({ error: "Text is required" });
//   }

//   try {
//     const mp3 = await openai.audio.speech.create({
//       model: "tts-1",
//       voice: "alloy",
//       input: text,
//     });

//     // Convert the response to a buffer
//     const buffer = Buffer.from(await mp3.arrayBuffer());

//     // Write the file to the disk
//     await fs.promises.writeFile(speechFile, buffer);

//     // Send the file back as a response
//     // res.setHeader("Content-Type", "audio/mpeg");
//     // res.sendFile(speechFile);
//   } catch (error) {
//     console.error("Error generating speech:", error);
//     res.status(500).json({ error: "Failed to generate speech" });
//   }
// });

module.exports = router;
