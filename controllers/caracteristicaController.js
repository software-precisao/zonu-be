const express = require('express');

const Caracteristica = require('../models/tb_caracteristica');
const Usuario = require('../models/tb_usuarios'); 

const obterCaracteristicas = async (req, res) => {
  try {
    const caracteristicas = await Caracteristica.findAll({
      include: [{ all: true }] 
    });
    return res.status(200).send({ response: caracteristicas });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


const obterCaracteristicaPorId = async (req, res) => {
  try {
    const caracteristica = await Caracteristica.findAll({
      where: {
        id_user: req.params.id_user,
      },
      include: [{
        model: Usuario,
        required: true,
      }],
    });

    if (caracteristica && caracteristica.length > 0) {
      return res.status(200).send({ response: caracteristica });
    } else {
      return res.status(404).send({ message: 'Características não encontradas para o usuário' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarCaracteristica = async (req, res) => {
  try {
    const novaCaracteristica = await Caracteristica.create(req.body);
    return res.status(201).send({ response: novaCaracteristica });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const atualizarCaracteristica = async (req, res) => {
  try {
    const caracteristicaAtualizada = await Caracteristica.update(req.body, {
      where: { id_caracteristica: req.params.id_caracteristica }
    });
    if (caracteristicaAtualizada[0]) {
      return res.status(200).send({ message: 'Característica atualizada com sucesso' });
    } else {
      return res.status(404).send({ message: 'Característica não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarCaracteristica = async (req, res) => {
  try {
    const deletado = await Caracteristica.destroy({
      where: { id_caracteristica: req.params.id_caracteristica }
    });
    if (deletado) {
      return res.status(200).send({ message: 'Característica deletada com sucesso' });
    } else {
      return res.status(404).send({ message: 'Característica não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterCaracteristicas,
  obterCaracteristicaPorId,
  criarCaracteristica,
  atualizarCaracteristica,
  deletarCaracteristica
};
