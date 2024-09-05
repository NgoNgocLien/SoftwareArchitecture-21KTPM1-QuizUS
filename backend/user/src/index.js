const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static("."));

const cors = require('cors');
app.use(cors());

const port = 8081;
app.listen(port);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const rootRoute = require('./routes');
app.use("/api", rootRoute);

require('dotenv').config();
