const express = require("express");
const router = express.Router();
const CategoriasController = require("../controllers/categoriaClienteController");

router.get("/", CategoriasController.getCategorias);
router.post("/cadastrar", CategoriasController.createCategoria);
router.put("/editar/:id_categoria_cliente", CategoriasController.updateCategoria);
router.delete("/deletar/:id_categoria_cliente", CategoriasController.deleteCategoria);

module.exports = router;
