const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");
const Cliente = require("./tb_clientes");

const Posicao = conn.define(
  "tb_posicao",
  {
    id_posicao: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tipo_posicao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = Posicao;
