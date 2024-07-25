const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const UserStatus = conn.define(
  "UserStatus",
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = UserStatus;