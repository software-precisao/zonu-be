const express = require("express");

const Lead = require("../models/tb_leads_site");

const obterLeads = async (req, res, next) => {
  try {
    const leads = await Lead.findAll();
    return res.status(200).send({ response: leads });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterLeadPorId = async (req, res, next) => {
  try {
    const lead = await Lead.findByPk(req.params.id_lead);
    if (lead) {
      return res.status(200).send({ response: lead });
    } else {
      return res.status(404).send({ message: "Lead não encontrado" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarLead = async (req, res, next) => {
  try {
    const novoLead = await Lead.create(req.body);
    return res.status(201).send({ response: novoLead });
  } catch (error) {
    console.error("Erro ao criar termo: ", error);
    return res.status(500).send({ error: error.message });
  }
};

const atualizarLead = async (req, res, next) => {
  try {
    const leadAtualizado = await Lead.update(req.body, {
      where: { id_lead: req.params.id_lead },
    });
    if (leadAtualizado[0]) {
      return res.status(200).send({ message: "Lead atualizado com sucesso" });
    } else {
      return res.status(404).send({ message: "Lead não encontrado" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarLead = async (req, res, next) => {
  try {
    const deletado = await Lead.destroy({
      where: { id_lead: req.params.id_lead },
    });
    if (deletado) {
      return res.status(200).send({ message: "Lead deletado com sucesso" });
    } else {
      return res.status(404).send({ message: "Lead não encontrado" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterLeads,
  obterLeadPorId,
  criarLead,
  atualizarLead,
  deletarLead,
};
