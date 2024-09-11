const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/criar', paymentController.criarPagamentoRecorrente);
router.get('/verificar/:paymentId', paymentController.verificarPagamento);
router.put('/pagamento/:id_pagamento/status', paymentController.alterarStatusPagamento);
router.post("/salvar-referencia", paymentController.salvarReferenciaPagamento);
router.get("/consultar-status/:id_user", paymentController.consultarStatusPagamento);

module.exports = router;