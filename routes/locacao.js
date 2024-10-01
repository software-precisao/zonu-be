const express = require('express');
const router = express.Router();
const locacaoController = require('../controllers/locacaoController');

router.post('/cadastrar', locacaoController.criarLocacao);
router.get('/', locacaoController.obterLocacoes);
router.get('/:id_locacao', locacaoController.obterLocacaoPorId);
router.put('/editar/:id_locacao', locacaoController.atualizarLocacao);
router.delete('/deletar/:id_locacao', locacaoController.deletarLocacao);

module.exports = router;