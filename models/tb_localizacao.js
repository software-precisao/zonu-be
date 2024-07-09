const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Localizacao = conn.define("tb_localizacao", {
  id_localizacao: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logradouro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numero_unidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  andar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  unidade_por_andar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total_andar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total_torres: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mostrar_andar_site: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mostrar_numero_unidade_site: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mostrar_logradouro_site: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mostrar_bairro_site: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mostrar_complemento_site: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mostrar_numero_site: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mostrar_nome_condominio_site: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mostrar_mapa_site: {
    type: DataTypes.STRING,
    allowNull: true,
  },


}, { freezeTableName: true });




module.exports = Localizacao;