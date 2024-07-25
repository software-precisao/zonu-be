const express = require("express");
const router = express.Router();
const LinkTemporario = require("../models/LinkTemporario"); // Caminho para o modelo LinkTemporario

const criarLinkTemporario = async (req, res, next) => {
  try {
    const { userId, url } = req.body;

    // Verifica se o userId e a URL foram fornecidos
    if (!userId || !url) {
      return res
        .status(400)
        .send({ error: "ID do usuário e URL são obrigatórios" });
    }

    // Define a data de expiração como 24 horas após a criação
    const dataCriacao = new Date();
    const dataExpiracao = new Date(dataCriacao.getTime() + 24 * 60 * 60 * 1000);

    // Cria o link temporário
    const link = await LinkTemporario.create({
      userId,
      url,
      dataCriacao,
      dataExpiracao,
      ativo: true,
    });

    return res.status(201).send({ response: link });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const listarLinksTemporarios = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Busca os links temporários associados ao usuário
    const links = await LinkTemporario.findAll({
      where: { userId },
    });

    // Atualiza o status dos links (ativo/inativo) com base na data de expiração
    const linksAtualizados = links.map((link) => {
      link.ativo = new Date() < new Date(link.dataExpiracao);
      link.save(); // Salva a atualização do status no banco de dados
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
