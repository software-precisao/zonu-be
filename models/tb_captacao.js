const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Captacao = conn.define(
  "tb_captacao",
  {
    id_captacao: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    origem_captacao: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { freezeTableName: true }
);

module.exports = Captacao;
