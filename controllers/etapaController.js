const Etapa = require("../models/tb_etapa");
const Funil = require("../models/tb_funil");

const createEtapa = async (req, res) => {
  try {
    const { nome_etapa, dias_limpeza, descricao, id_funil } = req.body;

    const novaEtapa = await Etapa.create({
      nome_etapa,
      dias_limpeza,
      descricao,
      id_funil,
    });

    res.status(201).json(novaEtapa);
  } catch (error) {
    console.error("Erro ao criar etapa:", error);
    res.status(500).json({ message: "Erro ao criar etapa" });
  }
};

const getEtapas = async (req, res) => {
  try {
    const etapas = await Etapa.findAll({
      include: [
        {
          model: Funil,
          as: "funil",
          attributes: ["nome_funil"],
        },
      ],
    });
    res.status(200).json(etapas);
  } catch (error) {
    console.error("Erro ao buscar etapas:", error);
    res.status(500).json({ message: "Erro ao buscar etapas" });
  }
};

const getEtapaById = async (req, res) => {
  try {
    const { id_etapa } = req.params;
    const etapa = await Etapa.findOne({
      where: { id_etapa },
      include: [
        {
          model: Funil,
          as: "funil",
          attributes: ["nome_funil"],
        },
      ],
    });

    if (!etapa) {
      return res.status(404).json({ message: "Etapa não encontrada" });
    }

    res.status(200).json(etapa);
  } catch (error) {
    console.error("Erro ao buscar etapa:", error);
    res.status(500).json({ message: "Erro ao buscar etapa" });
  }
};

const updateEtapa = async (req, res) => {
  try {
    const { id_etapa } = req.params;
    const { nome_etapa, dias_limpeza, descricao, id_funil } = req.body;

    const [updated] = await Etapa.update(
      { nome_etapa, dias_limpeza, descricao, id_funil },
      { where: { id_etapa } }
    );

    if (!updated) {
      return res.status(404).json({ message: "Etapa não encontrada" });
    }

    const etapaAtualizada = await Etapa.findOne({ where: { id_etapa } });
    res.status(200).json(etapaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar etapa:", error);
    res.status(500).json({ message: "Erro ao atualizar etapa" });
  }
};

const deleteEtapa = async (req, res) => {
  try {
    const { id_etapa } = req.params;

    const deleted = await Etapa.destroy({ where: { id_etapa } });

    if (!deleted) {
      return res.status(404).json({ message: "Etapa não encontrada" });
    }

    res.status(204).json({ message: "Etapa deletada!" });
  } catch (error) {
    console.error("Erro ao deletar etapa:", error);
    res.status(500).json({ message: "Erro ao deletar etapa" });
  }
};

module.exports = {
  createEtapa,
  getEtapas,
  getEtapaById,
  updateEtapa,
  deleteEtapa,
};
