const Locacao = require("../models/tb_locacao");
const Funil = require("../models/tb_funil");
const Etapa = require("../models/tb_etapa");
const e = require("cors");

const obterLocacoes = async (req, res, next) => {
  try {
    const locacoes = await Locacao.findAll({
      include: [
        {
          model: Etapa,
          as: "etapa",
          include: [
            {
              model: Funil, 
              as: "funil", 
            },
          ],
        },
      ],
    });
    return res.status(200).send({ response: locacoes });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterLocacaoPorId = async (req, res, next) => {
  try {
    const locacao = await Locacao.findByPk(req.params.id_locacao, {
      include: [
        {
          model: Etapa,
          as: "etapa",
          include: [
            {
              model: Funil, 
              as: "funil", 
            },
          ],
        },
      ],
    });
    if (locacao) {
      return res.status(200).send({ response: locacao });
    } else {
      return res.status(404).send({ message: "Locação não encontrada" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarLocacao = async (req, res, next) => {
  try {
    const { id_etapa } = req.body;

    const etapa = await Etapa.findByPk(id_etapa);
    if (!etapa) {
      return res.status(404).send({ message: "etapa não encontrada" });
    }

    const novaLocacao = await Locacao.create({ id_etapa });
    return res.status(201).send({ response: novaLocacao });
  } catch (error) {
    console.error("Erro ao criar locação: ", error);
    return res.status(500).send({ error: error.message });
  }
};

const atualizarLocacao = async (req, res, next) => {
  try {
    const { id_etapa } = req.body;

    const etapa = await Etapa.findByPk(id_etapa);
    if (!etapa) {
      return res.status(404).send({ message: "etapa não encontrada" });
    }

    const locacaoAtualizada = await Locacao.update(
      { id_etapa },
      { where: { id_locacao: req.params.id_locacao } }
    );

    if (locacaoAtualizada[0]) {
      return res.status(200).send({ message: "Locação atualizada com sucesso" });
    } else {
      return res.status(404).send({ message: "Locação não encontrada" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarLocacao = async (req, res, next) => {
  try {
    const deletado = await Locacao.destroy({
      where: { id_locacao: req.params.id_locacao },
    });
    if (deletado) {
      return res.status(200).send({ message: "Locação deletada com sucesso" });
    } else {
      return res.status(404).send({ message: "Locação não encontrada" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterLocacoes,
  obterLocacaoPorId,
  criarLocacao,
  atualizarLocacao,
  deletarLocacao,
};
