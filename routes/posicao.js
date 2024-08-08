const express = require("express");
const router = express.Router();
const Posicao = require("../controllers/posicaoController");

router.get("/", Posicao.getPosicoes);
router.post("/cadastrar", Posicao.createPosicao);
router.put("/editar/:id_posicao", Posicao.updatePosicao);
router.delete("/deletar/:id_posicao", Posicao.deletePosicao);

module.exports = router;