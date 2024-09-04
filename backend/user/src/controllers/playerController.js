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

const getAll = async (req, res) => {
    try{
        const players = await model.player.findAll();
        successCode(res, players, "Danh sách người chơi")
    }catch(err){
        console.log(err)
        errorCode(res)
    }
}

const update =  async (req,res) =>  {
    try{
        const player = await model.player.findOne({
            where: {
                id_player: req.body.id_player,
            }
        })

        if (player){
            player.facebook = req.body.facebook || player.facebook;
            player.avatar = req.body.avatar || player.avatar;
            player.dob = req.body.dob || player.dob;
            player.email = req.body.email || player.email;
            player.phone = req.body.phone || player.phone;
            player.gender = req.body.gender || player.gender;
            player.score = player.score += req.body.score 

            if (req.body.password){
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                player.pwd = hashedPassword;
            }

            const updatedPlayer = await player.save();
            successCode(res,updatedPlayer, "Cập nhật thành công")
        } else
            failCode(res, null, "id_player không hợp lệ")
    }catch(err){
        console.log(err)
        errorCode(res)
    }
}

module.exports = {signup, otp, login,
    getAll, update,
}