const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const port = 8082;

// Use the MongoDB Atlas URI from the environment variables
// MONGODB_ATLAS_URI=mongodb+srv://<db_username>:<db_password>@cluster0.jj66d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const dbURI = process.env.MONGODB_ATLAS_URI;
console.log("Database URI:", dbURI); 

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
