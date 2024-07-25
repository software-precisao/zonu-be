const { Sequelize, DataTypes } = require('sequelize');
const conn = require('../data/conn');

const LinkTemporario = conn.define('LinkTemporario', {
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

LinkTemporario.belongsTo(require('./Usuario'), {
  foreignKey: 'userId',
  as: 'usuario', 
});

module.exports = LinkTemporario;
