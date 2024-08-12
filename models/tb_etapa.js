const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Etapa = conn.define(
  "tb_etapa",
  {
    id_etapa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
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
        allowNull: false,
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    }
  },
  { freezeTableName: true }
);

module.exports = Etapa;
