const express = require('express');
const mongoose = require('mongoose');
const os = require('os');
require('dotenv').config();

const port = 8002;
const dbURI = process.env.MONGODB_ATLAS_URI

const app = express();
app.use(express.json());

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

app.use('/', (req, res) => {
    res.send(`Hello from ${os.hostname()}!`);
});