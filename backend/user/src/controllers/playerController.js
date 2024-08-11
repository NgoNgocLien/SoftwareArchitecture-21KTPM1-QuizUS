const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { Op, literal, fn, col } = require("sequelize");

const { successCode, failCode, errorCode } = require('../config/response');

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

module.exports = {signup}