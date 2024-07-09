const express = require('express');

const CaracteristicaCondominio = require('../models/condominio/tb_caracteristica_condominio');
const Usuario = require('../models/tb_usuarios'); 

const obterCaracteristicasCondominio = async (req, res) => {
  try {
    const caracteristicasCondominio = await CaracteristicaCondominio.findAll({
      include: [{ model: Usuario, as: 'Usuario' }] 
    });
    return res.status(200).send({ response: caracteristicasCondominio });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterCaracteristicaCondominioPorId = async (req, res) => {
  try {
    const caracteristicaCondominio = await CaracteristicaCondominio.findByPk(req.params.id_caracteristica_condominio, {
      include: [{ model: Usuario, as: 'Usuario' }]
    });
    if (caracteristicaCondominio) {
      return res.status(200).send({ response: caracteristicaCondominio });
    } else {
      return res.status(404).send({ message: 'Característica de condomínio não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarCaracteristicaCondominio = async (req, res) => {
  try {
    const novaCaracteristicaCondominio = await CaracteristicaCondominio.create(req.body);
    return res.status(201).send({ response: novaCaracteristicaCondominio });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const atualizarCaracteristicaCondominio = async (req, res) => {
  try {
    const caracteristicaCondominioAtualizada = await CaracteristicaCondominio.update(req.body, {
      where: { id_caracteristica_condominio: req.params.id_caracteristica_condominio }
    });
    if (caracteristicaCondominioAtualizada) {
      return res.status(200).send({ message: 'Característica de condomínio atualizada com sucesso' });
    } else {
      return res.status(404).send({ message: 'Característica de condomínio não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarCaracteristicaCondominio = async (req, res) => {
  try {
    const deletado = await CaracteristicaCondominio.destroy({
      where: { id_caracteristica_condominio: req.params.id_caracteristica_condominio }
    });
    if (deletado) {
      return res.status(200).send({ message: 'Característica de condomínio deletada com sucesso' });
    } else {
      return res.status(404).send({ message: 'Característica de condomínio não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterCaracteristicasCondominio,
  obterCaracteristicaCondominioPorId,
  criarCaracteristicaCondominio,
  atualizarCaracteristicaCondominio,
  deletarCaracteristicaCondominio
};
