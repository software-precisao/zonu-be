const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Lead = conn.define(
  "tb_lead_site",
  {
    id_lead: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = Lead;
