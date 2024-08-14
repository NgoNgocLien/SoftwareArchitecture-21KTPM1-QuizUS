const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignGameSchema = new Schema({
  id_campaign: { 
    type: Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
  id_game: { 
    type: Number, 
    required: true 
  },
  id_campaign_item1: { 
    type: Schema.Types.ObjectId, 
    ref: 'CampaignItem' 
  },
  id_campaign_item2: { 
    type: Schema.Types.ObjectId, 
    ref: 'CampaignItem' 
  },
  id_voucher1: { 
    type: Schema.Types.ObjectId, 
    ref: 'Voucher' 
  },
  amount_voucher1: { 
    type: Number, 
    default: 0 
  },
  id_voucher2: { 
    type: Schema.Types.ObjectId, 
    ref: 'Voucher' 
  },
  amount_voucher2: { 
    type: Number, 
    default: 0 
  },
  score_award: { 
    type: Number 
  }
});

module.exports = mongoose.model('CampaignGame', CampaignGameSchema);
