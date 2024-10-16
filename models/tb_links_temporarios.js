const { Sequelize, DataTypes } = require('sequelize');
const conn = require('../data/conn');
const Usuario = require('./tb_usuarios');

const LinkTemporario = conn.define('tb_link_temporario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tb_usuario',
      key: 'id_user', 
    },
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dataCriacao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dataExpiracao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, { freezeTableName: true });

LinkTemporario.belongsTo(Usuario, {
  foreignKey: 'id_user',
  as: 'usuario', 
});

module.exports = LinkTemporario;
