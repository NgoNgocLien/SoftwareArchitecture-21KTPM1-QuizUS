const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerGameSchema = new Schema({
  id_player: { 
    type: Number, 
    required: true 
  },
  id_campaign_item: { 
    type: Schema.Types.ObjectId, 
    ref: 'CampaignItem', 
    required: true 
  },
  play_time: { 
    type: Date, 
    required: true 
  },
  is_used: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model('PlayerGame', PlayerGameSchema);
