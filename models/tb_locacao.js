const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Etapa = require("./tb_etapa");
const Usuario = require("./tb_usuarios");

const Locacao = conn.define(
  "tb_locacao",
  {
    id_locacao: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_etapa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Locacao.belongsTo(Etapa, {
    foreignKey: "id_etapa",
    as: "etapa",
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
})

Locacao.belongsTo(Usuario, {
  foreignKey: "id_user",
  as: "usuario",
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
})


module.exports = Locacao;
