const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Imovel = require("./tb_imovel");
const Proximidades = require("./tb_proximidades");

const ProximidadesImovel = conn.define("tb_imovel_proximidades", {
    id_imovel_proximidades: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_proximidades: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_imovel: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },


}, { freezeTableName: true });


ProximidadesImovel.belongsTo(Imovel, {
    foreignKey: "id_imovel",
    foreignKeyConstraint: true,
});

ProximidadesImovel.belongsTo(Proximidades, {
    foreignKey: "id_proximidades",
    foreignKeyConstraint: true,
});



module.exports = ProximidadesImovel;