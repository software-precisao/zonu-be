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


//Cadastro de usuÃ¡rios
router.post("/cadastro-administrador", uploadFields, userController.cadastrarUsuarioAdministrador);
router.post("/cadastro-construtora", uploadFields, userController.cadastrarUsuarioConstrutora);
router.post("/cadastro-imobiliaria", uploadFields, userController.cadastrarUsuarioImobiliaria);
router.post("/cadastro-imobiliaria-user", uploadFields, userController.cadastrarSubUsuarioImobiliaria);
router.post("/cadastro-corretor", uploadFields, userController.cadastrarUsuarioCorretor);
router.post("/cadastro-vip", uploadFields, userController.cadastrarUsuarioVip);
router.post("/cadastro-equipe", uploadFields, userController.cadastrarEquipeZonu);
router.post("/cadastro-pessoa-fisica", uploadFields, userController.cadastrarPessoaFisica)


router.get('/subusuarios/:id_user', userController.obterSubUsuarioImobiliaria);

//Envio de documentos
router.put("/enviodoc-creci/:id_user", uploadFields, userController.atualizarCreci);
router.put("/enviodoc-cnpj/:id_user", uploadFields, userController.atualizarDocCnpj);

router.put("/editar-simples/:id_user", uploadFields, (req, res, next) => {
    next();
}, userController.editarUsuarioSimples);

router.put("/editar-cliente/:id_user", uploadFields, (req, res, next) => {
    next();
}, userController.editarCliente);


module.exports = router;