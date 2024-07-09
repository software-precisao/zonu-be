const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Descricao = conn.define("tb_descricao", {
  id_descricao: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apresentacao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, { freezeTableName: true });



module.exports = Descricao;