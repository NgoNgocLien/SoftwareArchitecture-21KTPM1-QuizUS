const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const port = 8083;

const dbURI = process.env.MONGODB_ATLAS_URI;
console.log("Database URI:", dbURI);

const app = express();
const campaignRoutes = require('./routes/campaignRoutes');
const voucherRoutes = require('./routes/voucherRoutes');
const itemRoutes = require('./routes/itemRoutes');
const gameRoutes = require('./routes/gameRoutes');

app.use(express.json());

app.use('/api/', campaignRoutes);
app.use('/api/voucher', voucherRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/game', gameRoutes);

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
