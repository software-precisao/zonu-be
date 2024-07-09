const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Preco = conn.define("tb_preco", {
  id_preco: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo_negocio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco_imovel: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  mostra_preco: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  text_preco_opcao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco_iptu: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  periodo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco_condominio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  financiado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  aceita_financiamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  minhacasa_minhavida: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total_mensal_taxas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descricao_taxas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  aceita_permuta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descricao_permuta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valor_metro_quadrado: {
    type: DataTypes.STRING,
    allowNull: true,
  },


}, { freezeTableName: true });



module.exports = Preco;