const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerGiftSchema = new Schema({
  id_sender: { 
    type: Number, 
    required: true 
  },
  id_receiver: { 
    type: Number, 
    required: true 
  },
  id_item: { 
    type: Schema.Types.ObjectId, 
    ref: 'CampaignItem', 
    required: true 
  },
  id_campaign_game: { 
    type: Schema.Types.ObjectId, 
    ref: 'CampaignGame', 
    required: true 
  },
  gift_time: { 
    type: String, 
    required: true 
  }
});

module.exports = mongoose.model('PlayerGift', PlayerGiftSchema);
