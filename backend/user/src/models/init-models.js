var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _brand = require("./brand");
var _game = require("./game");
var _player = require("./player");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var brand = _brand(sequelize, DataTypes);
  var game = _game(sequelize, DataTypes);
  var player = _player(sequelize, DataTypes);


  return {
    admin,
    brand,
    game,
    player,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
