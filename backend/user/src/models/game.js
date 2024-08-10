const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game', {
    id_game: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    instruction: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_exchangeable: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'game',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "game_pkey",
        unique: true,
        fields: [
          { name: "id_game" },
        ]
      },
    ]
  });
};
