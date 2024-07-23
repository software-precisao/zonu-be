const express = require("express");
const TokenPayment = require("../models/tb_token_payment");


const criarTokenPayment = async (req, res) => {
  try {
    const { api_key } = req.body;

    if (!api_key) {
      return res.status(400).send({ error: "api_key é obrigatório" });
    }

    const tokenPayment = await TokenPayment.create({ api_key });
    res.status(201).send(tokenPayment);
  } catch (error) {
    console.error("Erro ao criar TokenPayment:", error);
    res.status(500).send({ error: error.message }); 
  }
};

const buscarTodosTokenPayments = async (req, res) => {
  try {
    const tokenPayments = await TokenPayment.findAll();
    res.send(tokenPayments);
  } catch (error) {
    console.error("Erro ao buscar todos os TokenPayments:", error);
    res.status(500).send({ error: error.message });
  }
};

const buscarTokenPaymentPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenPayment = await TokenPayment.findByPk(id);
    if (!tokenPayment) {
      return res.status(404).send({ mensagem: "TokenPayment não encontrado." });
    }
    res.send(tokenPayment);
  } catch (error) {
    console.error("Erro ao buscar TokenPayment por ID:", error);
    res.status(500).send({ error: error.message });
  }
};

const atualizarTokenPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const { api_key } = req.body;

    const tokenPayment = await TokenPayment.findByPk(id);
    if (!tokenPayment) {
      return res.status(404).send({ mensagem: "TokenPayment não encontrado." });
    }

    tokenPayment.api_key = api_key;
    await tokenPayment.save();

    res.send({
      mensagem: "TokenPayment atualizado com sucesso!",
      tokenPayment,
    });
  } catch (error) {
    console.error("Erro ao atualizar TokenPayment:", error);
    res.status(500).send({ error: error.message });
  }
};

const deletarTokenPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenPayment = await TokenPayment.findByPk(id);

    if (!tokenPayment) {
      return res.status(404).send({ mensagem: "TokenPayment não encontrado." });
    }

    await tokenPayment.destroy();
    res.send({ mensagem: "TokenPayment deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar TokenPayment:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  criarTokenPayment,
  buscarTodosTokenPayments,
  buscarTokenPaymentPorId,
  atualizarTokenPayment,
  deletarTokenPayment,
};
