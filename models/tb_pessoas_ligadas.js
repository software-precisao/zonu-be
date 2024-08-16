const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");
const Cliente = require("./tb_clientes");

const PessoasLigadas = conn.define(
  "tb_pessoas_ligadas",
  {
    id_pessoa_ligada: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    breve_descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

PessoasLigadas.belongsTo(Cliente, {
  foreignKey: "id_cliente",
  as: "Cliente",
  foreignKeyConstraint: true,
});

module.exports = PessoasLigadas;
