const VideosYoutube = require("../models/tb_videos_youtube");

const isValidUrl = (url) => {
  try {
    new URL(url); 
    return true;
  } catch (e) {
    return false;
  }
};

const cadastrarVideo = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res
        .status(400)
        .send({ mensagem: "A URL do vídeo é obrigatória." });
    }

    if (!isValidUrl(url)) {
        return res.status(400).send({ mensagem: 'A URL fornecida não é válida.' });
      }

    const novoVideo = await VideosYoutube.create({ url });

    return res.status(201).send({
      mensagem: "Vídeo cadastrado com sucesso.",
      video: novoVideo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
};

const obterVideoPorId = async (req, res) => {
  try {
    const { id_video } = req.params;

    const video = await VideosYoutube.findByPk(id_video);

    if (!video) {
      return res.status(404).send({ mensagem: "Vídeo não encontrado." });
    }

    return res.status(200).send(video);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
};

const listarTodosVideos = async (req, res) => {
    try {
      const videos = await VideosYoutube.findAll();
      return res.status(200).send(videos);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: error.message });
    }
  };
  

module.exports = {
  cadastrarVideo,
  obterVideoPorId,
  listarTodosVideos,
};
