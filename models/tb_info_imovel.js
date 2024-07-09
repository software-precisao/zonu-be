const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Info = conn.define("tb_info_imovel", {
  id_info: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cod_referencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  corretor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  agenciador: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perfil_imovel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situacao_imovel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano_construcao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  incorporacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  posicao_solar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  terreno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  proximo_mar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  averbado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  escriturado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  esquina: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobilia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
 
}, { freezeTableName: true });


module.exports = Info;