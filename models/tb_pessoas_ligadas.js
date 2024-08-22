const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const PessoasLigadas = conn.define(
  "tb_pessoas_ligadas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_pessoa_ligada: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    breve_descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { freezeTableName: true,  }
);

module.exports = PessoasLigadas;
