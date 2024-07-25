const linkTemporario = require("../controllers/linksController");
const express = require("express");
const router = express.Router();

router.post("/api/links-temporarios", linkTemporario.criarLinkTemporario);
router.get(
  "/api/links-temporarios/:userId",
  linkTemporario.listarLinksTemporarios
);
