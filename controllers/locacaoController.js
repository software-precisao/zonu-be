const Locacao = require("../models/tb_locacao");
const Funil = require("../models/tb_funil");

const obterLocacoes = async (req, res, next) => {
  try {
    const locacoes = await Locacao.findAll({
      include: [{ model: Funil, as: "funil" }],
    });
    return res.status(200).send({ response: locacoes });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterLocacaoPorId = async (req, res, next) => {
  try {
    const locacao = await Locacao.findByPk(req.params.id_locacao, {
      include: [{ model: Funil, as: "funil" }],
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
    const { descricao, id_funil } = req.body;

    const funil = await Funil.findByPk(id_funil);
    if (!funil) {
      return res.status(404).send({ message: "Funil não encontrado" });
    }

    const novaLocacao = await Locacao.create({ descricao, id_funil });
    return res.status(201).send({ response: novaLocacao });
  } catch (error) {
    console.error("Erro ao criar locação: ", error);
    return res.status(500).send({ error: error.message });
  }
};

const atualizarLocacao = async (req, res, next) => {
  try {
    const { descricao, id_funil } = req.body;

    const funil = await Funil.findByPk(id_funil);
    if (!funil) {
      return res.status(404).send({ message: "Funil não encontrado" });
    }

    const locacaoAtualizada = await Locacao.update(
      { descricao, id_funil },
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
