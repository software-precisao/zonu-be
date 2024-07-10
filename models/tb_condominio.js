const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Condominio = conn.define("tb_condominio", {
  id_condominio: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome_condominio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: true,
},


}, { freezeTableName: true });


Condominio.belongsTo(Usuario, {
    foreignKey: "id_user",
    foreignKeyConstraint: true,
});

module.exports = Condominio;