const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");
const TipoCliente = require("./tb_tipo_cliente");
const Captacao = require("./tb_captacao");
const CategoriaCliente = require("./tb_categoria_cliente");
const Usuario = require("./tb_usuarios");

const Cliente = conn.define("tb_clientes", {
  id_cliente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_tipo_cliente: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_captacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_categoria_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_user: {
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
  cpf: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_de_nascimento: {
    type: DataTypes.STRING,
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
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefone_1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefone_2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  anotacao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  id_pessoa_ligada: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// Associa o cliente a ele mesmo para representar a ligação com outro cliente
Cliente.belongsTo(Cliente, {
  foreignKey: "id_pessoa_ligada",
  as: "PessoaLigada", 
  foreignKeyConstraint: true,
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

Cliente.belongsTo(Usuario, {
  foreignKey: "id_user",
  as: "Usuario",
  foreignKeyConstraint: true,
});

module.exports = Cliente;
