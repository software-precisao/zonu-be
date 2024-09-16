const express = require("express");
const router = express.Router();

const anotacaoCrmController = require("../controllers/anotacoesCrmController");

router.post("/cadastrar", anotacaoCrmController.criarAnotacaoCRM);

router.get("/", anotacaoCrmController.obterTodasAnotacoesCRM);
router.get("/:id_anotacao_crm", anotacaoCrmController.obterAnotacaoCRMPorId);

router.put(
  "/editar/:id_anotacao_crm",
  anotacaoCrmController.atualizarAnotacaoCRM
);

router.delete(
  "/deletar/:id_anotacao_crm",
  anotacaoCrmController.deletarAnotacaoCRM
);

module.exports = router;
