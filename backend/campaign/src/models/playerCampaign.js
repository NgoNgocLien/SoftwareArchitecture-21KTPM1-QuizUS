const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerCampaignSchema = new Schema({
  id_campaign: { 
    type: Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
  id_player: { 
    type: Number, 
    required: true 
  }
});

module.exports = mongoose.model('PlayerCampaign', PlayerCampaignSchema);
