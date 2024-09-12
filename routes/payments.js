const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/criar', paymentController.criarPagamentoRecorrente);
router.get('/verificar/:paymentId', paymentController.verificarPagamento);
router.put('/:id_pagamento/status', paymentController.alterarStatusPagamento); //ajeitar a lógica pra ser 1 ou 2 / 1 = pendente, 2 = pago
router.post("/salvar-referencia", paymentController.salvarReferenciaPagamento);
router.get("/consultar-pagamento/:id_user", paymentController.consultarTodosPagamentos);

module.exports = router;