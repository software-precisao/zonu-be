const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Mensagens = conn.define(
  "tb_mensagens",
  {
    id_mensagem: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mensagem: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tempo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  },
  { freezeTableName: true }
);

module.exports = Mensagens;
