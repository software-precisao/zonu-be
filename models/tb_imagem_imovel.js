const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const NovoImovel = require("./tb_imovel");

const ImagemImovel = conn.define("tb_imagem_imovel", {
  id_imagem: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_imovel: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

 
}, { freezeTableName: true });


ImagemImovel.belongsTo(NovoImovel, {
  foreignKey: "id_imovel",
});


module.exports = ImagemImovel;