const express = require("express");
const router = express.Router();
const LinkTemporario = require("../models/tb_links_temporarios");

const criarLinkTemporario = async (req, res, next) => {
  try {
    const { userId, url } = req.body;

    if (!userId || !url) {
      return res
        .status(400)
        .send({ error: "ID do usuário e URL são obrigatórios" });
    }

    const dataCriacao = new Date();
    const dataExpiracao = new Date(dataCriacao.getTime() + 24 * 60 * 60 * 1000);

    const link = await LinkTemporario.create({
      userId,
      url,
      dataCriacao,
      dataExpiracao,
      ativo: true,
    });

    return res.status(201).send({ response: link });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send({ error: "A URL deve ser única" });
    }
    return res.status(500).send({ error: error.message });
  }
};

const listarLinksTemporarios = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const links = await LinkTemporario.findAll({
      where: { userId },
    });

    const linksAtualizados = links.map((link) => {
      link.ativo = new Date() < new Date(link.dataExpiracao);
      link.save();
      return link;
    });

    return res.status(200).send({ response: linksAtualizados });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  criarLinkTemporario,
  listarLinksTemporarios,
};
