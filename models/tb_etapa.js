const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Etapa = conn.define(
  "tb_etapa",
  {
    id_etapa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_etapa: {
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
    id_funil: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_funil',
        key: 'id_funil'
      }
    }
  },
  { freezeTableName: true }
);

module.exports = Etapa;
