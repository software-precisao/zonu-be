const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");
const Etapa = require("./tb_etapa");

const Funil = conn.define(
  "tb_funil",
  {
    id_funil: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_funil: {
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
    }
  },
  { freezeTableName: true }
);


Funil.hasMany(Etapa, {
  foreignKey: 'id_funil',
  as: 'etapas',
  onDelete: 'CASCADE', 
});
Etapa.belongsTo(Funil, {
  foreignKey: 'id_funil',
  as: 'funil'
});

module.exports = Funil;
