const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Caracteristica = conn.define("tb_caracteristica", {
    id_caracteristica: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_caracteristica: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

}, { freezeTableName: true });

Caracteristica.belongsTo(Usuario, {
    foreignKey: "id_user",
    foreignKeyConstraint: true,
});

Usuario.hasMany(Caracteristica, {
    foreignKey: "id_user",
    constraints: true,
});


module.exports = Caracteristica;