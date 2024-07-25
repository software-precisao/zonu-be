const express = require('express');
const router = express.Router();
const linkTemporario = require('../controllers/linksController');

router.post('/api/links-temporarios', linkTemporario.criarLinkTemporario);
router.get('/api/links-temporarios/:userId', linkTemporario.listarLinksTemporarios);

module.exports = router;