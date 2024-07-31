const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");
const Perfil = require("./tb_perfil");

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
  },
  { freezeTableName: true }
);

PerfilUserImobiliaria.belongsTo(Usuario, {
  foreignKey: "id_user",
  foreignKeyConstraint: true,
});

PerfilUserImobiliaria.belongsTo(Perfil, {
  foreignKey: "id_perfil",
  foreignKeyConstraint: true,
});

module.exports = PerfilUserImobiliaria;
