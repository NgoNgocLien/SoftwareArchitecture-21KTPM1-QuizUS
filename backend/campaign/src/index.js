const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const port = 8082; 
const dbURI = 'mongodb://127.0.0.1:27017/QuizUs'; //process.env.

const app = express();
const campaignRoutes = require('./routes/campaignRoutes');

app.use(express.json());

app.use('/', campaignRoutes);

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