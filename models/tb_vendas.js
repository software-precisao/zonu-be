const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Funil = require("./tb_funil")

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
    id_funil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Vendas.belongsTo(Funil, {
    foreignKey: "id_funil",
    as: "funil",
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
})

module.exports = Vendas;
