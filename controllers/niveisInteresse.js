const express = require("express");
const router = express.Router();
const NivelInteresse = require("../models/tb_niveis_interesse");

const createNivelInteresse = async (req, res) => {
  try {
    const { nivel_interesse } = req.body;
    if (!nivel_interesse) {
      return res
        .status(400)
        .json({ message: "O campo nível de interesse é obrigatório" });
    }
    const novoNivelInteresse = await NivelInteresse.create({ nivel_interesse });
    return res.status(201).json(novoNivelInteresse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getNiveisInteresse = async (req, res) => {
  try {
    const niveisInteresse = await NivelInteresse.findAll();
    return res.status(200).json(niveisInteresse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateNivelInteresse = async (req, res) => {
  try {
    const { id_nivel_interesse } = req.params;
    const { nivel_interesse } = req.body;

    const nivelInteresse = await NivelInteresse.findByPk(id_nivel_interesse);
    if (!nivelInteresse) {
      return res
        .status(404)
        .json({ message: "Nível de interesse não encontrado" });
    }

    nivelInteresse.nivel_interesse = nivel_interesse;
    await nivelInteresse.save();

    return res.status(200).json(nivelInteresse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteNivelInteresse = async (req, res) => {
  try {
    const { id_nivel_interesse } = req.params; // Altere aqui para corresponder ao parâmetro da rota
    const nivelInteresse = await NivelInteresse.findByPk(id_nivel_interesse);
    if (!nivelInteresse) {
      return res
        .status(404)
        .json({ message: "Nível de interesse não encontrado" });
    }
    await nivelInteresse.destroy();
    return res
      .status(200)
      .json({ message: "Nível de interesse excluído com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNiveisInteresse,
  createNivelInteresse,
  deleteNivelInteresse,
  updateNivelInteresse,
};
