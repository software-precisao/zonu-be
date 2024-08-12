const express = require("express");
const etapaController = require("../controllers/etapaController");
const router = express.Router();

router.get("/", etapaController.getEtapas);
router.get("/:id_etapa", etapaController.getEtapaById);
router.post("/cadastrar", etapaController.createEtapa);
router.put("/editar/:id_etapa", etapaController.updateEtapa);
router.delete("/deletar/:id_etapa", etapaController.deleteEtapa);

module.exports = router;
