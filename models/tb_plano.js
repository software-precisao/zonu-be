const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Plano = conn.define("tb_plano", {
    id_plano: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_plano: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor_plano: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itens_do_plano: {
        type: DataTypes.JSON, // Usando JSON para armazenar um array de itens
        allowNull: true,
        defaultValue: [], // Valor padrão como array vazio
    }
}, { freezeTableName: true });

module.exports = Plano;
