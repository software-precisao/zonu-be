const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Imovel = require("./tb_imovel");

const AnotacaoImovel = conn.define(
  "tb_anotacao",
  {
    id_anotacao: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_imovel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    anotacao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

AnotacaoImovel.belongsTo(Imovel, {
  foreignKey: "id_imovel",
  foreignKeyConstraint: true,
});

module.exports = AnotacaoImovel;
