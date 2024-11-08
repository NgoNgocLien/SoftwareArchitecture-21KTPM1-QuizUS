const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerGameSchema = new Schema({
  id_player: {
    type: String,
    required: true
  },
  id_campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign', 
    required: true
  },
  player_turn: {
    type: Number,
    required: true
  },
  quantity_item1: {
    type: Number,
    required: true
  },
  quantity_item2: {
    type: Number,
    required: true
  }
}, { versionKey: false });

module.exports = mongoose.model('PlayerGames', PlayerGameSchema);
