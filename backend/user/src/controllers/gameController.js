const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { Op, literal, fn, col } = require("sequelize");

const { successCode, failCode, errorCode } = require('../config/response');

// get game by id
const get = async (req, res) => {
    const { id_game } = req.params;
  
    try {
        const game = await model.game.findOne({
            where: { id_game }
        });
  
        if (game) {
            successCode(res, game, "Lấy thông tin game thành công");
        } else {
            failCode(res, null, "Không tìm thấy game");
        }
    }
    catch (error) {
        console.error('Error:', error);
        errorCode(res);
    }
};

const update = async (req, res) => {
    try {
        const game = await model.game.findOne({
            where: {
                id_game: req.body.id_game,
            }
        })

        if (game) {
            game.name = req.body.name || game.name;
            const updatedgame = await game.save();
            successCode(res, updatedgame, "Cập nhật thành công")
        } else
            failCode(res, null, "id_game không hợp lệ")
    } catch (err) {
        console.log(err)
        errorCode(res)
    }
}

module.exports = { get, update }