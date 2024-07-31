const Controle = require('../models/tb_controle_teste');
const Usuario = require('../models/tb_usuarios');
const Plano = require('../models/tb_plano');

// Create
const createControle = async (req, res) => {
  try {
    const { data_inicio, status, id_plano, id_user } = req.body;
    const newControle = await Controle.create({ data_inicio, status, id_plano, id_user });
    res.status(201).json(newControle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar controle' });
  }
};

// Read
const getAllControles = async (req, res) => {
  try {
    const controles = await Controle.findAll({
      include: [Usuario, Plano],
    });
    res.status(200).json(controles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar controles' });
  }
};

const getControleById = async (req, res) => {
  try {
    const { id_user } = req.params;
    const controle = await Controle.findByPk(id_user, {
      include: [Usuario, Plano],
    });
    if (controle) {
      res.status(200).json(controle);
    } else {
      res.status(404).json({ error: 'Controle não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar controle' });
  }
};

// Update
const updateControle = async (req, res) => {
  try {
    const { id } = req.params;
    const { data_inicio, status, id_plano, id_user } = req.body;
    const controle = await Controle.findByPk(id);
    if (controle) {
      controle.data_inicio = data_inicio;
      controle.status = status;
      controle.id_plano = id_plano;
      controle.id_user = id_user;
      await controle.save();
      res.status(200).json(controle);
    } else {
      res.status(404).json({ error: 'Controle não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar controle' });
  }
};

// Delete
const deleteControle = async (req, res) => {
  try {
    const { id } = req.params;
    const controle = await Controle.findByPk(id);
    if (controle) {
      await controle.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Controle não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar controle' });
  }
};

module.exports = {
  createControle,
  getAllControles,
  getControleById,
  updateControle,
  deleteControle,
};