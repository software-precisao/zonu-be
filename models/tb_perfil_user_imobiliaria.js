const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");
const Perfil = require("./tb_perfil");
const Status = require("./tb_status");
const Nivel = require("./tb_nivel");

const PerfilUserImobiliaria = conn.define(
  "tb_perfil_user_imobiliaria",
  {
    id_perfil_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_perfil: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sobrenome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_nivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 6,
    },
    id_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  { freezeTableName: true }
);

PerfilUserImobiliaria.belongsTo(Perfil, {
  foreignKey: "id_perfil",
  as: "perfil",
});

PerfilUserImobiliaria.belongsTo(Usuario, {
  foreignKey: "id_user",
  as: "usuario",
});

PerfilUserImobiliaria.belongsTo(Status, {
  foreignKey: "id_status",
  as: "status",
});

PerfilUserImobiliaria.belongsTo(Nivel, {
  foreignKey: "id_nivel",
  as: "nivel",
});

module.exports = PerfilUserImobiliaria;