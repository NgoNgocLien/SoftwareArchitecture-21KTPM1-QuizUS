const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  id_brand1: { 
    type: Number, 
    required: true 
  },
  id_brand2: { 
    type: Number, 
  },
  name: { 
    type: String, 
    required: true 
  },
  photo: { 
    type: String 
  },
  start_datetime: { 
    type: Date, 
    required: true 
  },
  end_datetime: { 
    type: Date, 
    required: true 
  }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
