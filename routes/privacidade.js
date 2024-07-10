const express = require("express");
const router = express.Router();
const privacidadeController = require("../controllers/privacidadeController");

router.post("/cadastrar", privacidadeController.criarPrivacidade);
router.get("/", privacidadeController.obterPrivacidade);
router.get("/:id_termo", privacidadeController.obterPrivacidadePorId);
router.patch("/:id_termo", privacidadeController.atualizarprivacidade);
router.delete("/:id_termo", privacidadeController.deletarPrivacidade);

module.exports = router;
