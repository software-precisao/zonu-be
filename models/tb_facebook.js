const { DataTypes } = require("sequelize");

const conn = require("../data/conn");
const Usuario = require("./tb_usuarios");

const Facebook = conn.define(
  "tb_facebook",
  {
    id_facebook: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    shortLifeToken: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    longLifeToken: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pageFacebookId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Usuario.hasOne(Facebook, {
  foreignKey: "id_user",
  foreignKeyConstraint: true,
  onDelete: "CASCADE",
});

Facebook.belongsTo(Usuario, {
  foreignKey: "id_user",
  foreignKeyConstraint: true,
  onDelete: "CASCADE",
});

module.exports = Facebook;
