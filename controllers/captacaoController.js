const Captacao = require("../models/tb_captacao");

const getCaptacoes = async (req, res) => {
  try {
    const captacoes = await Captacao.findAll();
    return res.status(200).json(captacoes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createCaptacao = async (req, res) => {
  try {
    const { origem_captacao } = req.body;

    if (!origem_captacao) {
      return res
        .status(400)
        .json({ message: "O campo origem de captação é obrigatório" });
    }

    const novaCaptacao = await Captacao.create({ origem_captacao });
    return res.status(201).json(novaCaptacao);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateCaptacao = async (req, res) => {
  try {
    const { id_captacao } = req.params;
    const { origem_captacao } = req.body;

    const captacao = await Captacao.findByPk(id_captacao);
    if (!captacao) {
      return res.status(404).json({ message: "Captação não encontrada" });
    }

    captacao.origem_captacao = origem_captacao;
    await captacao.save();

    return res.status(200).json(captacao);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCaptacao = async (req, res) => {
  try {
    const { id_captacao } = req.params;
    const captacao = await Captacao.findByPk(id_captacao);
    if (!captacao) {
      return res.status(404).json({ message: "Captação não encontrada" });
    }

    await captacao.destroy();
    return res.status(200).json({ message: "Captação excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCaptacoes,
  createCaptacao,
  updateCaptacao,
  deleteCaptacao,
};
