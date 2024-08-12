const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Funil = conn.define(
  "tb_funil",
  {
    id_funil: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
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
        allowNull: false,
    }
  },
  { freezeTableName: true }
);

module.exports = Funil;
