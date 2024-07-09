const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");


const Publicacao = conn.define("tb_publicacao", {
  id_publicacao: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mostrar_imovel_publi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tarja_imovel_site_publi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cor_tarja_publi: {
    type: DataTypes.STRING,
    allowNull: true,
  },

 

}, { freezeTableName: true });


module.exports = Publicacao;