const express = require("express");
const router = express.Router();
const userController = require("../controllers/usuariosController");
const { uploadFields } = require("../helpers/file-uploader");
    
router.get("/", userController.obterUsuarios);
router.get("/:id_user", userController.obterUsuarioPorId);
router.patch("/status/", userController.atualizarStatusUsuario);
router.patch("/edit", userController.atualizarUsuario);
router.put("/dados/:id_user", userController.trocaSenha);
router.delete("/delete/:id_user", userController.excluirUsuario);
router.patch('/editar/', userController.atualizarDadosUsuario);
router.post('/verifica-email', userController.obterUsuarioPorEmail);
router.put('/edit/trocar-senha', userController.trocaSenhaporEmail);
router.post('/valida-code', userController.validaCode);
router.post("/cadastro", uploadFields, userController.cadastrarUsuario);
router.post("/cadastro-administrador", uploadFields, userController.cadastrarUsuarioSimple);
router.post("/cadastro-equipe", uploadFields, userController.cadastrarEquipeZonu);


module.exports = router;