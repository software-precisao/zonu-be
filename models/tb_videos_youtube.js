const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const VideosYoutube = conn.define(
  "tb_videos_youtube",
  {
    id_video: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true, 
      },
    },
  },
  { freezeTableName: true }
);

module.exports = VideosYoutube;
