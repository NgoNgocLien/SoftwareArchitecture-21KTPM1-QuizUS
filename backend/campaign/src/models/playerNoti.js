const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Campaign = require('./campaign');
const Voucher = require('./voucher');
const ItemGift = require('./itemGift');
const VoucherGift = require('./voucherGift');
const TurnRequest = require('./turnRequest');

const PlayerNotiSchema = new Schema({
    // type: voucher, campaign, friend
    // subtype: item, voucher, request_turn, receive_turn (của friend noti)

    /*
    1. yêu thích sự kiện -> thêm player like campaign, thêm noti nếu (start_time - 1) > now 

    2. đổi voucher -> thêm player voucher, update campaign (given_amount_voucher), player game / score, thêm noti với is_used = false
    3. dùng voucher -> update player voucher, thêm noti với is_used = true

    4. tặng item -> thêm item gift, update player game, thêm noti
    5. tặng voucher -> thêm voucher gift, update player voucher, thêm noti

    6. xin lượt chơi -> thêm turn request, thêm noti
    7. từ chối cho lượt chơi -> update turn request, update noti
    8. đồng ý cho lượt chơi -> update turn request, thêm noti

    1
    233458
     */
    type:{
        type: String,
        required: true
    },
    subtype:{
        type: String,
    },

    id_receiver: {
        type: String,
        required: true
    },
    id_sender: {
        type: String,
    },
    name_sender: {
        type: String,
    },

    // thông tin sự kiện, voucher
    id_campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
    },
    name_campaign: {
        type: String,
    },
    id_voucher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
    },
    name_voucher: {
        type: String,
    },
    id_item: {
        type: Number,
    },

    // thông báo voucher đã sử dụng / đổi
    is_used:{
        type: Boolean,
    },

    // thông báo sự kiện sắp diễn ra
    start_time:{
        type: Date
    },

    // thông báo tặng voucher
    id_vouchergift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VoucherGift',
    },

    // thông báo tặng item
    id_itemgift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemGift',
    },


    // thông báo X xin lượt chơi, X đồng ý tặng lượt chơi
    id_turnrequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TurnRequest',
    },
    is_accept:{
        type: Boolean,
    },

    // sắp xếp thông báo
    noti_time: {
        type: Date,
        default: Date.now,
        required: true
    },
    
    // người dùng xem thông báo
    seen_time: {
        type: Date,
    },
}, { versionKey: false });

module.exports = mongoose.model('PlayerNoti', PlayerNotiSchema);
