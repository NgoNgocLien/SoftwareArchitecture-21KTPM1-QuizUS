const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TurnRequestSchema = new Schema({
  id_sender: { 
    type: String,
    required: true
  },
  id_receiver: { 
    type: String,
    required: true
  },
  id_campaign: { 
    type: Schema.Types.ObjectId,
    ref: 'Campaign', 
    required: true
  },
  request_time: { 
    type: Date,
    default: Date.now 
  },
  reply_time: { 
    type: Date
  },
  is_accept:{
    type: Boolean,
  }
}, { versionKey: false });

module.exports = mongoose.model('TurnRequest', TurnRequestSchema);