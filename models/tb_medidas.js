const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Medidas = conn.define("tb_medidas", {
  id_medidas: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  area_contruida: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },

  area_privativa: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },

  area_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },

  media_metro_quadrado: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
 

}, { freezeTableName: true });


module.exports = Medidas;