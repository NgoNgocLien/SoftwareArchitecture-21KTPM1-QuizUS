const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerVoucherSchema = new Schema({
  id_player: { 
    type: String, 
    required: true 
  },
  id_voucher: { 
    type: Schema.Types.ObjectId, 
    ref: 'Voucher', 
    required: true 
  },
  is_used: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model('PlayerVoucher', PlayerVoucherSchema);
