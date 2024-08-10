const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('player', {
    id_player: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "player_username_key"
    },
    pwd: {
      type: DataTypes.STRING(255),
      allowNull: false
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
      allowNull: false,
      unique: "player_email_key"
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
    }
  }, {
    sequelize,
    tableName: 'player',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "player_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "player_pkey",
        unique: true,
        fields: [
          { name: "id_player" },
        ]
      },
      {
        name: "player_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
