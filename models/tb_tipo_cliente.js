const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const TipoCliente = conn.define(
  "tb_tipo_cliente",
  {
    id_tipo_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tipo_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = TipoCliente;
