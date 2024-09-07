const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerGiftSchema = new Schema({
  id_sender: { 
    type: String, 
    required: true 
  },
  id_receiver: { 
    type: String, 
    required: true 
  },
  id_item: { 
    type: Number,  
    required: true 
  },
  id_campaign: { 
    type: Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
  gift_time: { 
    type: Date, 
    required: true 
  },
  accept_time: { 
    type: Date
  }
}, { versionKey: false });

module.exports = mongoose.model('PlayerGift', PlayerGiftSchema);
