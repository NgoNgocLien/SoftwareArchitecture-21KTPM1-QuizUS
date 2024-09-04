const express = require('express');
const rootRoute = express.Router();
const adminRoute = require('./adminRoute');
const brandRoute = require('./brandRoute');
const gameRoute = require('./gameRoute');
const playerRoute = require('./playerRoute');

const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const bcrypt = require('bcryptjs');

const { successCode, failCode, errorCode } = require('../config/response');


rootRoute.use("/admin", adminRoute);
rootRoute.use("/brand", brandRoute);
rootRoute.use("/game", gameRoute);
rootRoute.use("/player", playerRoute);

rootRoute.post("/login", async (req, res) => {
    try{
        const {phoneNumber, password} = req.body;

        const player = await model.player.findOne({ where: { phone: phoneNumber } });

        if (!player) {
            return failCode(res, null, "Số điện thoại không tồn tại");
        }

        const isMatch = await bcrypt.compare(password, player.pwd);

        if (isMatch) {
            successCode(res, player, "Đăng nhập thành công");
        } else {
            failCode(res, null, "Mật khẩu không chính xác");
        }
    }catch(err){
        console.log(err)
        errorCode(res)
    }
})

module.exports = rootRoute;