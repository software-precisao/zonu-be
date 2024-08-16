const express = require('express');
const router = express.Router();

const pessoasLigadasController = require("../controllers/pessoasLigadasController");

router.post("/cadastrar", pessoasLigadasController.createPessoaLigada);
router.get("/", pessoasLigadasController.getPessoasLigadas);
router.put("/editar", pessoasLigadasController.updatePessoaLigada);
router.delete("/deletar", pessoasLigadasController.deletePessoaLigada);


module.exports = router;