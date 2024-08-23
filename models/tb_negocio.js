const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");
const Cliente = require("./tb_clientes");
const Etapa = require("./tb_etapa");
const NivelInteresse = require("./tb_niveis_interesse");
const NovoImovel = require("./tb_imovel");
const Usuario = require("./tb_usuarios");


const Negocio = conn.define(
  "tb_negocio",
  {
    id_negocio: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_etapa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_nivel_interesse: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_imovel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  { freezeTableName: true }
);

Negocio.belongsTo(Usuario, {
  foreignKey: "id_user",
  as: "Usuario" 
});

Negocio.belongsTo(Etapa, {
  foreignKey: "id_etapa",
  as: "Etapa" 
});

Negocio.belongsTo(NivelInteresse, {
  foreignKey: "id_nivel_interesse",
  as: "NivelInteresse" 
});

Negocio.belongsTo(Cliente, {
  foreignKey: "id_cliente",
  as: "Cliente" 
});

Negocio.belongsTo(NovoImovel, {
  foreignKey: "id_imovel",
  as: "NovoImovel" 
});

module.exports = Negocio;
