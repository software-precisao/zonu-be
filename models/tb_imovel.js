const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Info = require("./tb_info_imovel");
const Condominio = require("./tb_condominio");
const Comodos = require("./tb_comodos");
const Medidas = require("./tb_medidas");
const Preco = require("./tb_preco");
const Localizacao = require("./tb_localizacao");

const Descricao = require("./tb_descricao");
const Complemento = require("./tb_complementos");
const Usuario = require("./tb_usuarios");
const Publicacao = require("./tb_publicacao");



const NovoImovel = conn.define(
  "tb_novo_imovel",
  {
    id_imovel: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_info: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tem_condominio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_condominio: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_proprietario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_comodos: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_medidas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_preco: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_localizacao: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_descricao: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_complemento: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_publicacao: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

NovoImovel.belongsTo(Info, {
  as: "info",
  foreignKey: "id_info",
});

NovoImovel.belongsTo(Condominio, {
  foreignKey: "id_condominio",
  as: "condominio"
});


NovoImovel.belongsTo(Comodos, {
  foreignKey: "id_comodos",
  as: "comodos"
});

NovoImovel.belongsTo(Medidas, {
  foreignKey: "id_medidas",
  as: "medidas",
});

NovoImovel.belongsTo(Preco, {
  foreignKey: "id_preco",
  as: "preco",
});

NovoImovel.belongsTo(Localizacao, {
  foreignKey: "id_localizacao",
  as: "localizacao",
});

NovoImovel.belongsTo(Descricao, {
  foreignKey: "id_descricao",
  as: "descricao",
});

NovoImovel.belongsTo(Complemento, {
  foreignKey: "id_complemento",
  as: "complemento",
});

NovoImovel.belongsTo(Publicacao, {
  foreignKey: "id_publicacao",
  as: "publicacao",
});

NovoImovel.belongsTo(Usuario, {
  foreignKey: "id_user",
  as: "usuario",
});



module.exports = NovoImovel;
