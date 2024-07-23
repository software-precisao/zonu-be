const express = require("express");
const router = express.Router();
const Pagamento = require("../models/tb_pagamento");
// Rota para receber notificações do webhook do Asaas
router.post("/webhook/asaas", async (req, res) => {
  try {
    // Receber os dados do webhook
    const evento = req.body;

    // Assumindo que o ID do pagamento é enviado no webhook
    const { id, status } = evento;

    // Encontrar o pagamento pelo ID
    const pagamento = await Pagamento.findOne({ where: { id_pagamento: id } });

    if (!pagamento) {
      return res.status(404).send({ mensagem: "Pagamento não encontrado." });
    }

    // Atualizar o status do pagamento
    pagamento.status_pago = status === "PAID";
    await pagamento.save();

    // Responder com sucesso
    res
      .status(200)
      .send({ mensagem: "Status do pagamento atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar webhook do Asaas:", error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
