const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { Op, literal, fn, col } = require("sequelize");

const { successCode, failCode, errorCode } = require('../config/response');

const signup = async (req, res) => {
  try {
    const { name, field, address, lat, long, username, pwd, phone, email } = req.body;

    const existingBrand = await model.brand.findOne({ where: { [Op.or]: [{ username }, { email }] } });

    if (existingBrand) {
      return failCode(res, null, 'Username hoặc email đã tồn tại.');
    }

    const newBrand = await model.brand.create({
      name, field, address, lat, long, is_active: true, username, pwd, phone, email
    });

    return successCode(res, newBrand, 'Đăng ký brand thành công');
  } catch (error) {
    console.error('Error:', error);
    return errorCode(res);
  }
}

const getAll = async (req, res) => {
  try {
    const brands = await model.brand.findAll();

    return successCode(res, brands, 'Lấy danh sách brand thành công');
  } catch (error) {
    console.error('Error:', error);

    return errorCode(res, 'Không thể lấy danh sách brand');
  }
};

const search = async (req, res) => {
  const { keyword } = req.params;

  try {
    const brands = await model.brand.findAll({
      where: {
        name: {
          [Op.iLike]: `%${keyword}%`
        }
      }
    });

    return successCode(res, brands, 'Tìm kiếm brand thành công');
  } catch (error) {
    console.error('Error:', error);
    return errorCode(res, 'Không thể tìm kiếm brand');
  }
};

const update = async (req, res) => {
  const { id_brand } = req.params; 
  const {
    name,
    field,
    address,
    lat,
    long,
    is_active,
    username,
    pwd,
    phone,
    email
  } = req.body; 

  try {
    const brandToUpdate = await brand.findOne({
      where: { id_brand }
    });

    if (!brandToUpdate) {
      return failCode(res, null, "id_brand không hợp lệ");
    }

    brandToUpdate.name = name || brandToUpdate.name;
    brandToUpdate.field = field || brandToUpdate.field;
    brandToUpdate.address = address || brandToUpdate.address;
    brandToUpdate.lat = lat || brandToUpdate.lat;
    brandToUpdate.long = long || brandToUpdate.long;
    brandToUpdate.is_active = is_active !== undefined ? is_active : brandToUpdate.is_active;
    brandToUpdate.username = username || brandToUpdate.username;
    
    if (pwd) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pwd, salt);
      brandToUpdate.pwd = hashedPassword;
    } else {
      brandToUpdate.pwd = brandToUpdate.pwd;
    }

    brandToUpdate.phone = phone || brandToUpdate.phone;
    brandToUpdate.email = email || brandToUpdate.email;

    const updatedBrand = await brandToUpdate.save();
    
    return successCode(res, updatedBrand, "Cập nhật thành công");
  } catch (error) {
    console.error('Error:', error);
    return errorCode(res);
  }
};

module.exports = { signup, getAll, search, update }