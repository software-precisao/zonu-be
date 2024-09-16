const AnotacaoCRM = require("../models/tb_anotacao_crm"); 
const Cliente = require("../models/tb_clientes");

const criarAnotacaoCRM = async (req, res) => {
  try {
    const { id_cliente, anotacao } = req.body;

    const novaAnotacao = await AnotacaoCRM.create({ id_cliente, anotacao });

    return res.status(201).send(novaAnotacao);
  } catch (error) {
    console.error("Erro ao criar anotação CRM: ", error);
    return res.status(500).send({ error: "Erro ao criar anotação" });
  }
};

const obterTodasAnotacoesCRM = async (req, res) => {
  try {
    const anotacoes = await AnotacaoCRM.findAll({
      include: { model: Cliente, as: "cliente" }, 
    });

    return res.status(200).send(anotacoes);
  } catch (error) {
    console.error("Erro ao buscar anotações CRM: ", error);
    return res.status(500).send({ error: "Erro ao buscar anotações" });
  }
};

const obterAnotacaoCRMPorId = async (req, res) => {
  try {
    const { id_anotacao_crm } = req.params;

    const anotacao = await AnotacaoCRM.findByPk(id_anotacao_crm, {
      include: { model: Cliente, as: "cliente" }, 
    });

    if (!anotacao) {
      return res.status(404).send({ message: "Anotação não encontrada" });
    }

    return res.status(200).send(anotacao);
  } catch (error) {
    console.error("Erro ao buscar anotação CRM: ", error);
    return res.status(500).send({ error: "Erro ao buscar anotação" });
  }
};

const atualizarAnotacaoCRM = async (req, res) => {
  try {
    const { id_anotacao_crm } = req.params;
    const { id_cliente, anotacao } = req.body;

    const anotacaoExistente = await AnotacaoCRM.findByPk(id_anotacao_crm);

    if (!anotacaoExistente) {
      return res.status(404).send({ message: "Anotação não encontrada" });
    }

    const anotacaoAtualizada = await anotacaoExistente.update({
      id_cliente,
      anotacao,
    });

    return res.status(200).send(anotacaoAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar anotação CRM: ", error);
    return res.status(500).send({ error: "Erro ao atualizar anotação" });
  }
};

const deletarAnotacaoCRM = async (req, res) => {
  try {
    const { id_anotacao_crm } = req.params;

    const anotacaoExistente = await AnotacaoCRM.findByPk(id_anotacao_crm);

    if (!anotacaoExistente) {
      return res.status(404).send({ message: "Anotação não encontrada" });
    }

    await anotacaoExistente.destroy();

    return res.status(200).send({ message: "Anotação deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar anotação CRM: ", error);
    return res.status(500).send({ error: "Erro ao deletar anotação" });
  }
};

module.exports = {
  criarAnotacaoCRM,
  obterTodasAnotacoesCRM,
  obterAnotacaoCRMPorId,
  atualizarAnotacaoCRM,
  deletarAnotacaoCRM,
};
