const express = require('express');
const router = express.Router();
const progressaoController = require('../controllers/progressController');

router.post('/cadastro', progressaoController.criarProgressao);
router.get('/', progressaoController.buscarTodasProgressoes);
router.get('/buscar/:id_user', progressaoController.buscarProgressaoPorId);
router.patch('/editar/', progressaoController.atualizarProgressao);
router.delete('/delete/:id', progressaoController.deletarProgressao);

module.exports = router;
