const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Imovel = require("./tb_imovel");
const User = require("./tb_usuarios");

const Qrcode = conn.define("tb_qrcode", {
    id_qrcode: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    qrcode: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    tipo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_imovel: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },


}, { freezeTableName: true });


Qrcode.belongsTo(Imovel, {
    foreignKey: "id_imovel",
    foreignKeyConstraint: true,
});

Qrcode.belongsTo(User, {
    foreignKey: "id_user",
    foreignKeyConstraint: true,
});



module.exports = Qrcode;