const express = require('express');
const router = express.Router();
const controleController = require('../controllers/periodoTestController');

router.post('/controle', controleController.createControle);
router.get('/controle', controleController.getAllControles);
router.get('/:id_user', controleController.getControleById);
router.put('/controle/:id_controle', controleController.updateControle);
router.delete('/controle/:id_controle', controleController.deleteControle);

module.exports = router;