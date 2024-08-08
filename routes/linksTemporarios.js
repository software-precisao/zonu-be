const express = require('express');
const router = express.Router();
const linkTemporario = require('../controllers/linksController');

router.post('/cadastrar-link', linkTemporario.criarLinkTemporario);
router.get('/links/:id_user', linkTemporario.listarLinksTemporarios);

module.exports = router;