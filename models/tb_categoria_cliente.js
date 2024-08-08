const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const CategoriaCliente = conn.define(
  "tb_categoria_cliente",
  {
    id_categoria_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    categoria_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = CategoriaCliente;
