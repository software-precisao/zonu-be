const express = require("express");
const router = express.Router();
const ClienteController = require("../controllers/clientesController");

router.get("/", ClienteController.getClientes);
router.get("/:id_cliente", ClienteController.getClienteById);
router.post("/cadastrar", ClienteController.createCliente);
router.put("/editar/:id_cliente", ClienteController.updateCliente);
router.delete("/deletar/:id_cliente", ClienteController.deleteCliente);

module.exports = router;
