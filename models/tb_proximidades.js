const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Proximidades = conn.define("tb_proximidades", {
    id_proximidade: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_proximidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

}, { freezeTableName: true });

Proximidades.belongsTo(Usuario, {
    foreignKey: "id_user",
    foreignKeyConstraint: true,
});


module.exports = Proximidades;