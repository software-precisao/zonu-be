const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController')

router.post('/enviarMensagem', messagesController.enviarMensagem);
router.get('/mensagens', messagesController.pegarTodasMensagens);
router.get('/mensagens/:id_mensagem', messagesController.pegarMensagemPorId);

module.exports = router;