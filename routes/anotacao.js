const express = require('express');
const router = express.Router();
const anotacaoController = require('../controllers/anotacaoController');

router.post('/cadastrar', anotacaoController.criarAnotacao);
router.get('/', anotacaoController.obterAnotacoes);
router.get('/list/:id_imovel', anotacaoController.obterAnotacaoPorId);
router.patch('/:id_imovel', anotacaoController.atualizarAnotacao);
router.delete('/tickets/:id_imovel', anotacaoController.deletarAnotacao);

module.exports = router;