const express = require("express");
const router = express.Router();
const TipoClienteController = require("../controllers/tipoClienteController");

router.get("/", TipoClienteController.getTipoClientes);
router.post("/cadastrar", TipoClienteController.createTipoCliente);
router.put("/editar/:id_tipo_cliente", TipoClienteController.updateTipoCliente);
router.delete("/deletar/:id_tipo_cliente", TipoClienteController.deleteTipoCliente);

module.exports = router;
