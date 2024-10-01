const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');

router.post('/cadastrar', vendasController.criarVenda);
router.get('/', vendasController.obterVendas);
router.get('/:id_venda', vendasController.obterVendaPorId);
router.put('/editar/:id_venda', vendasController.atualizarVenda);
router.delete('/deletar/:id_venda', vendasController.deletarVenda);

module.exports = router;