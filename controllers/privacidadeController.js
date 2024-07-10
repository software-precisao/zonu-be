const express = require('express');

const Privacidade = require('../models/tb_privacidade');

const obterPrivacidade = async (req, res, next) => {
  try {
    const privacidades = await Privacidade.findAll();
    return res.status(200).send({ response: privacidades });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterPrivacidadePorId = async (req, res, next) => {
  try {
    const provacidade = await Privacidade.findByPk(req.params.id_privacidade);
    if (provacidade) {
      return res.status(200).send({ response: provacidade });
    } else {
      return res.status(404).send({ message: 'Privacidade não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarPrivacidade = async (req, res, next) => {
  try {
    const novaPrivacidade = await Privacidade.create(req.body);
    return res.status(201).send({ response: novaPrivacidade });
  } catch (error) {
    console.error("Erro ao criar provacidade: ", error);
    return res.status(500).send({ error: error.message });
  }
};

const atualizarprivacidade = async (req, res, next) => {
  try {
    const privacidadeAtualizada = await Privacidade.update(req.body, {
      where: { id_privacidade: req.params.id_privacidade }
    });
    if (privacidadeAtualizada[0]) {
      return res.status(200).send({ message: 'Privacidade atualizada com sucesso' });
    } else {
      return res.status(404).send({ message: 'Privacidade não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarPrivacidade = async (req, res, next) => {
  try {
    const deletado = await Privacidade.destroy({
      where: { id_privacidade: req.params.id_privacidade }
    });
    if (deletado) {
      return res.status(200).send({ message: 'Privacidade deletada com sucesso' });
    } else {
      return res.status(404).send({ message: 'Privacidade não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterPrivacidade,
  obterPrivacidadePorId,
  criarPrivacidade,
  atualizarprivacidade,
  deletarPrivacidade
};
