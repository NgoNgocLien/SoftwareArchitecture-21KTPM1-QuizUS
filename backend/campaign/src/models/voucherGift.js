const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoucherGiftSchema = new Schema({
  id_sender: { 
    type: String, 
    required: true 
  },
  id_receiver: { 
    type: String, 
    required: true 
  },
  id_playervoucher: { 
    type: Schema.Types.ObjectId,
    ref: 'PlayerVoucher', 
    required: true 
  },
  gift_time: { 
    type: Date, 
    required: true,
    default: Date.now 
  }
}, { versionKey: false });

module.exports = mongoose.model('VoucherGift', VoucherGiftSchema);
