const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/criar', paymentController.criarPagamentoRecorrente);
router.get('/verificar/:paymentId', paymentController.verificarPagamento);

module.exports = router;