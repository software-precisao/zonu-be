const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Plano = require("./tb_plano");
const Usuario = require("./tb_usuarios");

const Controle = conn.define(
  "tb_controle_teste",
  {
    id_controle: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_plano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Controle.belongsTo(Usuario, {
  foreignKey: "id_user",
  foreignKeyConstraint: true,
});

Controle.belongsTo(Plano, {
  foreignKey: "id_plano",
  foreignKeyConstraint: true,
});

module.exports = Usuario;
