const express = require('express');
const router = express.Router();
const logoController = require('../controllers/logoController');

router.post('/cadastrar', logoController.createLogo);
router.put('/editar/:id_logo', logoController.updateLogo);
router.delete('/deletar/:id_logo', logoController.deleteLogo);

module.exports = router;