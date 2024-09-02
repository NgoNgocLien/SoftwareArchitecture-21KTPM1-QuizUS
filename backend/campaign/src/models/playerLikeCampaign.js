const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Corrected CampaignSchema for referencing campaigns
const CampaignSchema = new Schema({
  id_campaign: { 
    type: Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  }
});

// Corrected PlayerLikeCampaignSchema based on the JSON structure
const PlayerLikeCampaignSchema = new Schema({
  id_player: { type: String, required: true },
  campaigns: [CampaignSchema]  // Array of campaigns the player likes
});

module.exports = mongoose.model('PlayerLikeCampaign', PlayerLikeCampaignSchema);
