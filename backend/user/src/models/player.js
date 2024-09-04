const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('player', {
    id_player: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal("nextval('player_id_seq'::regclass)")
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pwd: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN(10),
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10
    }
  }, {
    sequelize,
    tableName: 'player',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "player_pkey",
        unique: true,
        fields: [
          { name: "id_player" },
        ]
      },
    ]
  });
};
