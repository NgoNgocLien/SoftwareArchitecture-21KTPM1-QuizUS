const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const bcrypt = require('bcryptjs');
const { Op, literal, fn, col } = require("sequelize");

const { successCode, failCode, errorCode } = require('../config/response');

const signup = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const player = await model.player.findOne({
            where: {
                phone: phoneNumber
            }
        })

        if (!player)
            successCode(res, true, "Số điện thoại chưa đăng ký")
        else
            failCode(res, null, "Số điện thoại đã được đăng ký")
    } catch (err) {
        console.log(err)
        errorCode(res)
    }
}

const otp = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const player = await model.player.create({
            phone: phoneNumber,
            pwd: hashedPassword,
        })

        console.log(player)

        if (player)
            successCode(res, true, "Tạo tài khoản thành công")
        else
            failCode(res, null, "Tạo tài khoản thất bại")
    } catch (err) {
        console.log(err)
        errorCode(res)
    }
}

const getAll = async (req, res) => {
    try {
        const players = await model.player.findAll();
        successCode(res, players, "Danh sách người chơi")
    } catch (err) {
        console.log(err)
        errorCode(res)
    }
}

// get player by id
const get = async (req, res) => {
    const { id_player } = req.params;

    try {
        const player = await model.player.findOne({
            where: { id_player }
        });

        if (player) {
            successCode(res, player, "Lấy thông tin player thành công");
        } else {
            failCode(res, null, "Không tìm thấy player");
        }
    }
    catch (error) {
        console.error('Error:', error);
        errorCode(res);
    }
};

const update = async (req, res) => {
    try {
        const player = await model.player.findOne({
            where: {
                id_player: req.body.id_player,
            }
        })

        if (player) {
            player.username = req.body.username || player.username;
            player.facebook = req.body.facebook || player.facebook;
            player.avatar = req.body.avatar || player.avatar;
            player.dob = req.body.dob || player.dob;
            player.email = req.body.email || player.email;
            player.phone = req.body.phone || player.phone;
            player.gender = req.body.gender || player.gender;
            player.score = player.score += req.body.score

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                player.pwd = hashedPassword;
            }

            const updatedPlayer = await player.save();
            successCode(res, updatedPlayer, "Cập nhật thành công")
        } else
            failCode(res, null, "id_player không hợp lệ")
    } catch (err) {
        console.log(err)
        errorCode(res)
    }
}

const search = async (req, res) => {
    const { keyword } = req.params;

    try {
        const players = await model.player.findAll({
            where: {
                [Op.or]: [
                    { id_player: keyword },
                    { email: keyword },
                    { phone: keyword },
                ]
            }
        });

        if (players.length > 0) {
            successCode(res, players[0], 'Tìm thấy player thành công');
        } else {
            failCode(res, [], 'Không tìm thấy player nào phù hợp');
        }
    } catch (error) {
        console.error('Lỗi tìm kiếm player:', error);
        errorCode(res);
    }
}

const getPlayerScore = async (req, res) => {
    const { id_player } = req.params;

    try {
        const playerData = await model.player.findOne({
            where: { id_player }
        });

        if (!playerData) {
            return failCode(res, null, "id_player không hợp lệ");
        }

        return successCode(res, { score: playerData.score }, "Lấy điểm số thành công");
    } catch (error) {
        console.error('Error:', error);
        return errorCode(res);
    }
};

const exchangeVoucherByCoin = async (req, res) => {
    try {
        const player = await model.player.findOne({
            where: {
                id_player: req.body.id_player,
            }
        })

        if (player) {
            player.score = player.score -= req.body.score

            const updatedPlayer = await player.save();
            successCode(res, updatedPlayer, "Cập nhật thành công")
        } else
            failCode(res, null, "id_player không hợp lệ")
    } catch (err) {
        console.log(err)
        errorCode(res)
    }
}

module.exports = {
    signup, otp,
    get, getAll, update, search, getPlayerScore, exchangeVoucherByCoin
}