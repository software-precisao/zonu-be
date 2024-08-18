// models/tb_funil.js
const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Funil = conn.define(
  "tb_funil",
  {
    id_funil: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_funil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dias_limpeza: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    etapas: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

module.exports = Funil;
