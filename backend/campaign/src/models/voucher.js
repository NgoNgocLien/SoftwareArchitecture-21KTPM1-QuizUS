const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoucherSchema = new Schema({
  id_brand: { 
    type: Number, 
    required: true 
  },
  name: { 
    type: String, 
  },
  code: { 
    type: String, 
  },
  qr_code: { 
    type: String, 
  },
  photo: { 
    type: String 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String 
  },
  expired_date: { 
    type: Date, 
    required: true 
  },
  score_exchange: { 
    type: Number 
  },
  status: { 
    type: Boolean, 
    default: true 
  }
}, { versionKey: false });

module.exports = mongoose.model('Voucher', VoucherSchema);
