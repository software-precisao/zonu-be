const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");


const Logo = conn.define(
  "tb_logo",
  {
    id_logo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { freezeTableName: true }
);

module.exports = Logo;
