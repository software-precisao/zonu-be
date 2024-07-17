const express = require('express');

const Condominio = require('../models/tb_condominio');

// Obtém todos os condomínios
const obterCondominios = async (req, res, next) => {
  try {
    const condominios = await Condominio.findAll();
    return res.status(200).send({ response: condominios });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Obtém um condomínio pelo ID
const obterCondominioPorId = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const condominio = await Condominio.findAll({
      where: { id_user },
    });
    if (condominio) {
      return res.status(200).send({ response: condominio });
    } else {
      return res.status(404).send({ message: 'Condomínio não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });  
  }
};

// Cria um novo condomínio
const criarCondominio = async (req, res, next) => {
  try {
    const { nome_condominio, id_user } = req.body;
    
    const novoCondominio = await Condominio.create({
      nome_condominio: nome_condominio || null,
      id_user: id_user ? id_user : null
    });
    return res.status(201).send({ response: novoCondominio });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Atualiza um condomínio pelo ID
const atualizarCondominio = async (req, res, next) => {
  try {
    const atualizado = await Condominio.update(req.body, {
      where: { id_condominio: req.params.id_condominio }
    });
    if (atualizado[0]) {
      return res.status(200).send({ message: 'Condomínio atualizado com sucesso' });
    } else {
      return res.status(404).send({ message: 'Condomínio não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Deleta um condomínio pelo ID
const deletarCondominio = async (req, res, next) => {
  try {
    const deletado = await Condominio.destroy({
      where: { id_condominio: req.params.id_condominio }
    });
    if (deletado) {
      return res.status(200).send({ message: 'Condomínio deletado com sucesso' });
    } else {
      return res.status(404).send({ message: 'Condomínio não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterCondominios,
  obterCondominioPorId,
  criarCondominio,
  atualizarCondominio,
  deletarCondominio
};
