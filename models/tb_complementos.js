const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");


const Complemento = conn.define("tb_complemento", {
  id_complemento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  link_youtube: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  link_apresentacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  link_drive: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { freezeTableName: true });





module.exports = Complemento;