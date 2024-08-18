const Etapa = require("../models/tb_etapa");

const getEtapas = async (req, res) => {
  try {
    const etapas = await Etapa.findAll();
    return res.status(200).json(etapas);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getEtapaById = async (req, res) => {
  try {
    const { id_etapa } = req.params.id_etapa;
    const etapa = await Etapa.findByPk(id_etapa);
    if (!etapa) {
      return res.status(404).json({ message: "Etapa não encontrada" });
    }
    return res.status(200).json(etapa);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createEtapa = async (req, res) => {
  try {
    const { nome_etapa, dias_limpeza, descricao } = req.body;

    // Validação básica
    if (!nome_etapa || !dias_limpeza || !descricao) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const novaEtapa = await Etapa.create({
      nome_etapa,
      dias_limpeza,
      descricao,
    });

    return res.status(201).json(novaEtapa);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateEtapa = async (req, res) => {
  try {
    const { id_etapa } = req.params.id_etapa;
    const { nome_etapa, dias_limpeza, descricao } = req.body;

    const etapa = await Etapa.findByPk(id_etapa);
    if (!etapa) {
      return res.status(404).json({ message: "Etapa não encontrada" });
    }

    etapa.nome_etapa = nome_etapa || etapa.nome_etapa;
    etapa.dias_limpeza = dias_limpeza || etapa.dias_limpeza;
    etapa.descricao = descricao || etapa.descricao;

    await etapa.save();
    return res.status(200).json(etapa);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteEtapa = async (req, res) => {
  try {
    const { id_etapa } = req.params.id_etapa;
    const etapa = await Etapa.findByPk(id_etapa);
    if (!etapa) {
      return res.status(404).json({ message: "Etapa não encontrada" });
    }

    await etapa.destroy();
    return res.status(200).json({ message: "Etapa excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEtapas,
  getEtapaById,
  createEtapa,
  updateEtapa,
  deleteEtapa,
};
