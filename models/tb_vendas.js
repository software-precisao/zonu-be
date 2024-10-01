const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Etapa = require("./tb_etapa");

const Vendas = conn.define(
  "tb_vendas",
  {
    id_venda: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_etapa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Vendas.belongsTo(Etapa, {
    foreignKey: "id_etapa",
    as: "etapa",
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
})

module.exports = Vendas;
