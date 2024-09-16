const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Cliente = require("./tb_clientes");

const AnotacaoCRM = conn.define(
  "tb_anotacao_crm",
  {
    id_anotacao_crm: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    anotacao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

AnotacaoCRM.belongsTo(Cliente, {
  foreignKey: "id_cliente",
  as: "cliente", 
  foreignKeyConstraint: true,
});


module.exports = AnotacaoCRM;
