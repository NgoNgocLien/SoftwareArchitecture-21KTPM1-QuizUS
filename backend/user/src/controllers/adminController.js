const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { Op, literal, fn, col } = require("sequelize");

const { successCode, failCode, errorCode } = require('../config/response');

function validateAdminData(data) {
  const errors = [];

  if (!data.username || typeof data.username !== 'string' || data.username.trim() === '') {
    errors.push('Username là bắt buộc và phải là chuỗi ký tự.');
  }

  if (data.fullname && typeof data.fullname !== 'string') {
    errors.push('Fullname phải là chuỗi ký tự.');
  }

  if (data.pwd && typeof data.pwd !== 'string') {
    errors.push('Mật khẩu phải là chuỗi ký tự.');
  }

  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push('Email không hợp lệ.');
  }

  if (data.phone && !/^\d{9,11}$/.test(data.phone)) {
    errors.push('Số điện thoại phải là chuỗi số từ 9 đến 11 chữ số.');
  }

  if (data.is_active !== undefined && typeof data.is_active !== 'boolean') {
    errors.push('Trạng thái hoạt động (is_active) phải là boolean.');
  }

  return errors;
}

const createAdmin = async (req, res) => {
  try {
    const errors = validateAdminData(req.body);
    if (errors.length > 0) {
      return failCode(res, errors, 'Dữ liệu không hợp lệ.');
    }

    const { username, fullname, pwd, email, phone, is_active } = req.body;

    const existingAdmin = await model.admin.findOne({ where: { username } });
    if (existingAdmin) {
      return failCode(res, null, 'Admin với username này đã tồn tại.');
    }

    const newAdmin = await model.admin.create({ username, fullname, pwd, email, phone, is_active });
    successCode(res, newAdmin, 'Tạo admin thành công.');
  } catch (error) {
    errorCode(res);
    console.log(error.message)
  }
}

const updateAdmin = async (req, res) => {
  try {
    const errors = validateAdminData(req.body);
    if (errors.length > 0) {
      return failCode(res, errors, 'Dữ liệu không hợp lệ.');
    }

    const { username, fullname, pwd, email, phone, is_active } = req.body;

    const existingAdmin = await model.admin.findOne({ where: { username } });
    if (!existingAdmin) {
      return failCode(res, null, 'Admin không tồn tại.');
    }

    await existingAdmin.update({ fullname, pwd, email, phone, is_active });
    successCode(res, existingAdmin, 'Sửa thông tin admin thành công.');
  } catch (error) {
    errorCode(res);
  }
}

const deleteAdmin = async (req, res) => {
  try {
    const { username } = req.body;
    
    const existingAdmin = await model.admin.findOne({ where: { username } });
    if (!existingAdmin) {
      return failCode(res, null, 'Admin không tồn tại.');
    }

    await existingAdmin.destroy();
    successCode(res, null, 'Xóa admin thành công.');
  } catch (error) {
    errorCode(res);
  }
}



module.exports = {
  createAdmin,
  updateAdmin,
  deleteAdmin
}