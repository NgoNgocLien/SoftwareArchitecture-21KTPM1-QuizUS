const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Quiz = require('./quiz');

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
        maxlength: 255,
        required: true
    },
    photo: {
        type: String,
        maxlength: 255
    },
    description: {
        type: String,
        maxlength: 255,
    },
    start_datetime: {
        type: Date,
        required: true
    },
    end_datetime: {
        type: Date,
        required: true
    },
    id_voucher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
        required: true
    },
    max_amount_voucher: {
        type: Number,
        required: true
    },
    given_amount_voucher: {
        type: Number,
        required: true
    },
    id_quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    item1_photo: {
        type: String,
    },
    item2_photo: {
        type: String,
    },
    score_award: {
        type: Number,
    }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
