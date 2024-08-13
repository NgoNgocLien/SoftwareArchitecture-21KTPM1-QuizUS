const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignItemSchema = new Schema({
  id_campaign: { 
    type: Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
  photo: { 
    type: String
  }
});

module.exports = mongoose.model('CampaignItem', CampaignItemSchema);