const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Negocio = require("./tb_negocio");

const AnotacaoCRM = conn.define(
  "tb_anotacao_crm",
  {
    id_anotacao_crm: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_negocio: {
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

AnotacaoCRM.belongsTo(Negocio, {
  foreignKey: "id_negocio",
  as: "negocio", 
  foreignKeyConstraint: true,
});


module.exports = AnotacaoCRM;
