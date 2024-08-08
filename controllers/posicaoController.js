const Posicao = require("../models/tb_posicao");

const getPosicoes = async (req, res) => {
  try {
    const posicoes = await Posicao.findAll();
    return res.status(200).json(posicoes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createPosicao = async (req, res) => {
  try {
    const { tipo_posicao } = req.body;

    if (!tipo_posicao) {
      return res
        .status(400)
        .json({ message: "O campo tipo de posição é obrigatório" });
    }

    const novaPosicao = await Posicao.create({ tipo_posicao });
    return res.status(201).json(novaPosicao);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updatePosicao = async (req, res) => {
  try {
    const { id_posicao } = req.params;
    const { tipo_posicao } = req.body;

    const posicao = await Posicao.findByPk(id_posicao);
    if (!posicao) {
      return res.status(404).json({ message: "Posição não encontrada" });
    }

    posicao.tipo_posicao = tipo_posicao;
    await posicao.save();

    return res.status(200).json(posicao);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deletePosicao = async (req, res) => {
  try {
    const { id_posicao } = req.params;
    const posicao = await Posicao.findByPk(id_posicao);
    if (!posicao) {
      return res.status(404).json({ message: "Posição não encontrada" });
    }

    await posicao.destroy();
    return res.status(200).json({ message: "Posição excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPosicoes,
  createPosicao,
  updatePosicao,
  deletePosicao,
};
