const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Etapa = require("./tb_etapa");

const Locacao = conn.define(
  "tb_locacao",
  {
    id_locacao: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_etapa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Locacao.belongsTo(Etapa, {
    foreignKey: "id_etapa",
    as: "etapa",
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
})

module.exports = Locacao;
