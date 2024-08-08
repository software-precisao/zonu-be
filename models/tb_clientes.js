const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");
const TipoCliente = require("./tb_tipo_cliente");
const Captacao = require("./tb_captacao");
const CategoriaCliente = require("./tb_categoria_cliente");

const Cliente = conn.define("tb_clientes", {
  id_cliente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_tipo_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_captacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_categoria_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  data_de_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  profissao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  uf: {
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
  anotacao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Cliente.belongsTo(TipoCliente, {
  foreignKey: "id_tipo_cliente",
  as: "TipoCliente",
  foreignKeyConstraint: true,
});


Cliente.belongsTo(Captacao, {
  foreignKey: "id_captacao",
  as: "Captacao",
  foreignKeyConstraint: true,
});

Cliente.belongsTo(CategoriaCliente, {
  foreignKey: "id_categoria_cliente",
  as: "CategoriaCliente", 
  foreignKeyConstraint: true,
});

module.exports = Cliente;
