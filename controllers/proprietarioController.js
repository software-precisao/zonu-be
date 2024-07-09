const express = require('express');

const Proprietario = require('../models/tb_proprietario');
const Usuario = require('../models/tb_usuarios'); 

const obterProprietarios = async (req, res) => {
  try {
    const proprietarios = await Proprietario.findAll({
      include: [{ model: Usuario, as: 'Usuario' }] 
    });
    return res.status(200).send({ response: proprietarios });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// const obterProprietarioPorId = async (req, res) => {
//   try {
//     const proprietario = await Proprietario.findByPk(req.params.id_user, {
//       include: [{ model: Usuario, as: 'Usuario' }]
//     });
//     if (proprietario) {
//       return res.status(200).send({ response: proprietario });
//     } else {
//       return res.status(404).send({ message: 'Proprietário não encontrado' });
//     }
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

const obterProprietarioPorId = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const proprietario = await Proprietario.findAll({
      where: { id_user },
    });
    if (proprietario) {
      return res.status(200).send({ response: proprietario });
    } else {
      return res.status(404).send({ message: 'Proprietário não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarProprietario = async (req, res) => {
  try {
    const novoProprietario = await Proprietario.create(req.body);
    return res.status(201).send({ response: novoProprietario });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const atualizarProprietario = async (req, res) => {
  try {
    const proprietarioAtualizado = await Proprietario.update(req.body, {
      where: { id_proprietario: req.params.id_proprietario }
    });
    if (proprietarioAtualizado) {
      return res.status(200).send({ message: 'Proprietário atualizado com sucesso' });
    } else {
      return res.status(404).send({ message: 'Proprietário não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarProprietario = async (req, res) => {
  try {
    const deletado = await Proprietario.destroy({
      where: { id_proprietario: req.params.id_proprietario }
    });
    if (deletado) {
      return res.status(200).send({ message: 'Proprietário deletado com sucesso' });
    } else {
      return res.status(404).send({ message: 'Proprietário não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterProprietarios,
  obterProprietarioPorId,
  criarProprietario,
  atualizarProprietario,
  deletarProprietario
};
