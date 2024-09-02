const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const bcrypt = require('bcryptjs');


const { Op, literal, fn, col } = require("sequelize");

const { successCode, failCode, errorCode } = require('../config/response');

const login =  async (req,res) =>  {
    try{
        const {phoneNumber, password} = req.body;

        const player = await model.player.findOne({ where: { phone: phoneNumber } });

        if (!player) {
            return failCode(res, null, "Số điện thoại không tồn tại");
        }

        const isMatch = await bcrypt.compare(password, player.pwd);

        if (isMatch) {
            successCode(res, true, "Đăng nhập thành công");
        } else {
            failCode(res, null, "Mật khẩu không chính xác");
        }
    }catch(err){
        console.log(err)
        errorCode(res)
    }
}

const signup =  async (req,res) =>  {
    try{
        const {phoneNumber} = req.body;
        const player = await model.player.findOne({
            where: { 
                phone: phoneNumber 
            }
        })

        if (!player)
            successCode(res,true, "Số điện thoại chưa đăng ký")
        else 
            failCode(res,null,"Số điện thoại đã được đăng ký")
    }catch(err){
        console.log(err)
        errorCode(res)
    }
}

const otp =  async (req,res) =>  {
    try{
        const {phoneNumber, password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const player = await model.player.create({
            phone: phoneNumber,
            pwd: hashedPassword,
        })

        console.log(player)

        if (player)
            successCode(res,true, "Tạo tài khoản thành công")
        else 
            failCode(res,null,"Tạo tài khoản thất bại")
    }catch(err){
        console.log(err)
        errorCode(res)
    }
}

module.exports = {signup, otp, login}