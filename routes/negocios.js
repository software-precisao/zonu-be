const express = require("express");
const router = express.Router();
const negociosController = require("../controllers/negociosController");

router.get("/", negociosController.getNegocios);

router.post("/cadastrar", negociosController.createNegocio);

router.put("/:id", negociosController.updateNegocio);

router.delete("/:id", negociosController.deleteNegocio);

module.exports = router;
