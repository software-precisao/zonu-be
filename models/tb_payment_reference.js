const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const PaymentReference = conn.define(
  "tb_payment_reference",
  {
    id_cobranca: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  { freezeTableName: true }
);

module.exports = PaymentReference;
