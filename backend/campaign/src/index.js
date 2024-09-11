const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const port = 8003;

const dbURI = process.env.MONGODB_ATLAS_URI;
console.log("Database URI:", dbURI);

const app = express();
const campaignRoutes = require('./routes/campaignRoutes');
const voucherRoutes = require('./routes/voucherRoutes');
const gameRoutes = require('./routes/gameRoutes');
const notiRoutes = require('./routes/notiRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/campaign', campaignRoutes);
app.use('/api/voucher', voucherRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/noti', notiRoutes);

// Get config from cloudinary
app.get("/api/cloudinary", (req,res) => {
    const timestamp = Math.round((new Date).getTime()/1000);

    const signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp,
        eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
        folder: 'quizus'}, process.env.SECRET_KEY);

    res.json({
        signature: signature,
        timestamp: timestamp,
        cloudname: process.env.CLOUD_NAME,
        apikey: process.env.API_KEY
    })
})

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.error('Failed to connect to database:', err);
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
