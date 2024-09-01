const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");
const Etapa = require("./tb_etapa");
const Usuario = require("./tb_usuarios");

const Funil = conn.define(
  "tb_funil",
  {
    id_funil: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_funil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dias_limpeza: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Funil.belongsTo(Usuario, {
  foreignKey: "id_user",
  as: "Usuario",
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});

Funil.hasMany(Etapa, {
  foreignKey: 'id_funil',
  as: 'etapas',
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});

Etapa.belongsTo(Funil, {
  foreignKey: 'id_funil',
  as: 'funil',
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});

module.exports = Funil;
