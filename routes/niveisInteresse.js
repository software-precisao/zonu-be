const express = require("express");
const router = express.Router();
const NivelInteresse = require("../controllers/niveisInteresse");

router.get("/", NivelInteresse.getNiveisInteresse);
router.post("/cadastrar", NivelInteresse.createNivelInteresse);
router.put("/editar/:id_nivel_interesse", NivelInteresse.updateNivelInteresse);
router.delete("/deletar/:id_nivel_interesse", NivelInteresse.deleteNivelInteresse);

module.exports = router;