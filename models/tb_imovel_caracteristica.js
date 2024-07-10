const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Imovel = require("./tb_imovel");
const Caracteristica = require("./tb_caracteristica");

const CaracteristicaImovel = conn.define("tb_caracteristica_imovel", {
    id_imovel_caracteristica: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_caracteristica: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_imovel: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },


}, { freezeTableName: true });


CaracteristicaImovel.belongsTo(Imovel, {
    foreignKey: "id_imovel",
    foreignKeyConstraint: true,
});

CaracteristicaImovel.belongsTo(Caracteristica, {
    foreignKey: "id_caracteristica",
    foreignKeyConstraint: true,
});



module.exports = CaracteristicaImovel;