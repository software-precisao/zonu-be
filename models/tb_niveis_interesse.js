const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const NivelInteresse = conn.define(
  "tb_niveis_interesse",
  {
    id_nivel_interesse: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nivel_interesse: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = NivelInteresse;
