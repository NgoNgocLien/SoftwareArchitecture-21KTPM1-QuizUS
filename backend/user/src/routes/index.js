const express = require('express');
const rootRoute = express.Router();
const adminRoute = require('./adminRoute');
const brandRoute = require('./brandRoute');
const gameRoute = require('./gameRoute');
const playerRoute = require('./playerRoute');


rootRoute.use("/admin", adminRoute);
rootRoute.use("/brand", brandRoute);
rootRoute.use("/game", gameRoute);
rootRoute.use("/player", playerRoute);

module.exports = rootRoute;