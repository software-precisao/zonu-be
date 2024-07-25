const { Sequelize, DataTypes } = require('sequelize');
const conn = require('../data/conn');

const LinkTemporario = conn.define('tb_link_temporario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
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

LinkTemporario.belongsTo(require('../models/tb_usuarios'), {
  foreignKey: 'userId',
  as: 'usuario', 
});

module.exports = LinkTemporario;
