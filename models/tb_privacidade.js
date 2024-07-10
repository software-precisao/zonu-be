const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Privacidade = conn.define(
  "tb_privacidade",
  {
    id_privacidade: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  { freezeTableName: true }
);

module.exports = Privacidade;