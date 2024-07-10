const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const User = require("./tb_usuarios");

const Progressao = conn.define("tb_progressao", {
  id_progressao: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  perfil: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  logo_capa: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  imovel: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  publicacao: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

 
}, { freezeTableName: true });

Progressao.belongsTo(User, {
  foreignKey: "id_user",
  foreignKeyConstraint: true,
});


module.exports = Progressao;