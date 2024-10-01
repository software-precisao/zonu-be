const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Funil = require("./tb_funil")

const Locacao = conn.define(
  "tb_locacao",
  {
    id_locacao: {
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

Locacao.belongsTo(Funil, {
    foreignKey: "id_funil",
    as: "funil",
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
})

module.exports = Locacao;
