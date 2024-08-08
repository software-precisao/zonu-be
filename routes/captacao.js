const express = require("express");
const router = express.Router();
const CaptacaoController = require("../controllers/captacaoController");

router.get("/", CaptacaoController.getCaptacoes);
router.post("/cadastrar", CaptacaoController.createCaptacao);
router.put("/editar/:id_captacao", CaptacaoController.updateCaptacao);
router.delete("/deletar/:id_captacao", CaptacaoController.deleteCaptacao);

module.exports = router;
