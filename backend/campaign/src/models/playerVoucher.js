const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerVoucherSchema = new Schema({
    id_player: {
        type: String,
        required: true
    },
    id_campaign: {
        type: Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    is_used: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });

module.exports = mongoose.model('PlayerVoucher', PlayerVoucherSchema);
