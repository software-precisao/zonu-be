const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Perfil = conn.define(
  "tb_perfil",
  {
    id_perfil: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    razao_social: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    termos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

Perfil.belongsTo(Usuario, {
  foreignKey: "id_user",
  foreignKeyConstraint: true,
});

module.exports = Perfil;
