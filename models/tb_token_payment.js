const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const TokenPayment = conn.define(
  "tb_token_payment",
  {
    id_token_pay: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    api_key: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url_base: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = TokenPayment;
