const express = require("express");
const router = express.Router();
const negociosController = require("../controllers/negociosController");

router.get("/", negociosController.getNegocios);

router.post("/cadastrar", negociosController.createNegocio);

router.put("/editar/:id_negocio", negociosController.updateNegocio);

router.delete("/deletar/:id_negocio", negociosController.deleteNegocio);

module.exports = router;
