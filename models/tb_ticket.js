const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const User = require("./tb_usuarios");

const Ticket = conn.define("tb_ticket", {
    id_ticket: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    assunto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    protocolo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    mensagem: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    resposta: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    data_pergunta: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    data_resposta: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    tempo_resposta: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },


}, { freezeTableName: true });


Ticket.belongsTo(User, {
    foreignKey: "id_user",
    as: "usuario",
    foreignKeyConstraint: true,
  });

module.exports = Ticket;