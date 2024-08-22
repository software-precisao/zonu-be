const express = require("express");
const router = express.Router();
const etapaController = require("../controllers/etapaController");

router.post("/cadastrar", etapaController.createEtapa);
router.get("/", etapaController.getEtapas);
router.get("/:id_etapa", etapaController.getEtapaById);
router.put("/editar/:id_etapa", etapaController.updateEtapa);
router.delete("/deletar/:id_etapa", etapaController.deleteEtapa);

module.exports = router;
