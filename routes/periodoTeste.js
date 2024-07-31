const express = require('express');
const router = express.Router();
const controleController = require('../controllers/periodoTestController');

router.post('/controle', controleController.createControle);
router.get('/controle', controleController.getAllControles);
router.get('/controle/:id', controleController.getControleById);
router.put('/controle/:id', controleController.updateControle);
router.delete('/controle/:id', controleController.deleteControle);

module.exports = router;