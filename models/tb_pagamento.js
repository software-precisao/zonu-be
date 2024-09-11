const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");
const Usuario = require("./tb_usuarios");

const Pagamento = conn.define(
  "tb_pagamento_controle",
  {
    id_pagamento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: "id_user",
      },
      allowNull: false,
    },
    status_pago: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_vencimento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    id_cobranca: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
    },
  },
  { freezeTableName: true }
);

Usuario.hasMany(Pagamento, {
  foreignKey: "id_user",
  as: "pagamentos",
});

Pagamento.belongsTo(Usuario, {
  foreignKey: "id_user",
  as: "usuario",
});

module.exports = Pagamento;
