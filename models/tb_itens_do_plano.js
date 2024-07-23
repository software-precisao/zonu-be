const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");
const Plano = require("./tb_plano");

const ItensPlano = conn.define("tb_itens_do_plano", {
    id_item: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_plano: {
        type: DataTypes.INTEGER,
        references: {
            model: Plano,
            key: 'id_plano',
        },
        allowNull: false,
    },
    nome_item: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { freezeTableName: true });

Plano.hasMany(ItensPlano, {
    foreignKey: 'id_plano',
    as: 'itens_do_plano',
    foreignKeyConstraint: true,
    onDelete: 'CASCADE',
});

ItensPlano.belongsTo(Plano, {
    foreignKey: 'id_plano',
    as: 'plano',
    foreignKeyConstraint: true,
    onDelete: 'CASCADE', 
});

module.exports = ItensPlano;
