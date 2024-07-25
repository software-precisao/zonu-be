const express = require("express");
const router = express.Router();
const tokensController = require("../controllers/tokenPaymentController");

// Rota para criar um novo token
router.post("/cadastrar", tokensController.criarTokenPayment);
router.get("/", tokensController.buscarTodosTokenPayments);
router.get("/buscar/:id", tokensController.buscarTokenPaymentPorId);
router.put("/edit/:id", tokensController.atualizarTokenPayment);
router.delete("/delete/:id", tokensController.deletarTokenPayment);

module.exports = router;
