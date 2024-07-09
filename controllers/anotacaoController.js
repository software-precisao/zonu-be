const express = require('express');
const AnotacaoImovel = require('../models/tb_anotacao');

const obterAnotacoes = async (req, res) => {
  try {
    const anotacoes = await AnotacaoImovel.findAll();
    return res.status(200).send({ response: anotacoes });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterAnotacaoPorId = async (req, res) => {
  try {
    const anotacao = await AnotacaoImovel.findByPk(req.params.id_anotacao);
    if (anotacao) {
      return res.status(200).send({ response: anotacao });
    } else {
      return res.status(404).send({ message: 'Anotação não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarAnotacao = async (req, res) => {
  try {
    const novaAnotacao = await AnotacaoImovel.create(req.body);
    return res.status(201).send({ response: novaAnotacao });
  } catch (error) {
    console.error("Erro ao criar anotação: ", error);
    return res.status(500).send({ error: error.message });
  }
};

const atualizarAnotacao = async (req, res) => {
  try {
    const anotacaoAtualizada = await AnotacaoImovel.update(req.body, {
      where: { id_anotacao: req.params.id_anotacao }
    });
    if (anotacaoAtualizada[0]) {
      return res.status(200).send({ message: 'Anotação atualizada com sucesso' });
    } else {
      return res.status(404).send({ message: 'Anotação não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarAnotacao = async (req, res) => {
  try {
    const deletado = await AnotacaoImovel.destroy({
      where: { id_anotacao: req.params.id_anotacao }
    });
    if (deletado) {
      return res.status(200).send({ message: 'Anotação deletada com sucesso' });
    } else {
      return res.status(404).send({ message: 'Anotação não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterAnotacoes,
  obterAnotacaoPorId,
  criarAnotacao,
  atualizarAnotacao,
  deletarAnotacao
};
