const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");


const Comodos = conn.define("tb_comodos", {
  id_comodos: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  dormitorio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  suite: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  banheiro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  garagem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  garagem_coberta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  garagem_box: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sala_tv: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sala_jantar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sala_estar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lavabo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  area_servico: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cozinha: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  closet: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  escritorio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  casa_empregada: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  copa: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, { freezeTableName: true });



module.exports = Comodos;