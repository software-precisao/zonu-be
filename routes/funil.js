const express = require("express");
const router = express.Router();
const funilController = require("../controllers/funilController");

router.post("/cadastrar", funilController.criarFunil);
router.get("/", funilController.obterTodosFunis);
router.get("/:id_funil", funilController.obterFunilPorId);
router.put("/editar/:id_funil", funilController.atualizarFunil);
router.delete("/deletar/:id_funil", funilController.excluirFunil);

module.exports = router;
