const express = require("express");
const router = express.Router();
const negociosController = require("../controllers/negociosController");

router.get("/", negociosController.getNegocios);

router.post("/cadastrar", negociosController.createNegocio);

router.put("/editar/:id_negocio", negociosController.updateNegocio);

router.put('/negocios/:id_negocio/mover-etapa', negociosController.updateNegocioParaEtapa);

router.put('/:id_negocio/status', negociosController.updateStatusNegocio);


router.delete("/deletar/:id_negocio", negociosController.deleteNegocio);

module.exports = router;
