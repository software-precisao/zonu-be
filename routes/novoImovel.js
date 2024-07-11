const express = require("express");
const router = express.Router();
const { uploadArray } = require("../helpers/file-uploader");
const novoImovelController = require("../controllers/imovelController");

router.post("/cadastrar", uploadArray, (req, res, next) => {
    next();
}, novoImovelController.criarImovel);
router.put("/editar/:id_imovel", uploadArray, (req, res, next) => {
    next();
}, novoImovelController.editarImovel);

router.get('/', novoImovelController.obterTodosImoveisCompletos);
router.get('/buscar/:id_imovel', novoImovelController.obterImovelCompletoId);
router.get('/user/:id_user', novoImovelController.obterImovelCompletoIdUser);
router.delete('/delete/:id_imovel', novoImovelController.excluirImovel);
router.get('/bairro', novoImovelController.obterBairro);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: NovoImovel
 *   description: Gerenciamento dos novos imóveis
 */

/**
 * @swagger
 * /novoImovel:
 *   get:
 *     summary: Lista todos os novos imóveis
 *     tags: [NovoImovel]
 *     responses:
 *       200:
 *         description: Lista de novos imóveis retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NovoImovel'
 *   post:
 *     summary: Cadastra um novo imóvel
 *     tags: [NovoImovel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoImovel'
 *     responses:
 *       201:
 *         description: Novo imóvel cadastrado com sucesso.
 *       500:
 *         description: Erro ao cadastrar o novo imóvel.
 */

/**
 * @swagger
 * /novoImovel/{id_novo_imovel}:
 *   get:
 *     summary: Obtém um novo imóvel pelo ID
 *     tags: [NovoImovel]
 *     parameters:
 *       - in: path
 *         name: id_novo_imovel
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do novo imóvel
 *     responses:
 *       200:
 *         description: Novo imóvel encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NovoImovel'
 *       404:
 *         description: Novo imóvel não encontrado.
 *   put:
 *     summary: Atualiza um novo imóvel pelo ID
 *     tags: [NovoImovel]
 *     parameters:
 *       - in: path
 *         name: id_novo_imovel
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do novo imóvel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoImovel'
 *     responses:
 *       200:
 *         description: Novo imóvel atualizado com sucesso.
 *       404:
 *         description: Novo imóvel não encontrado.
 *   delete:
 *     summary: Deleta um novo imóvel pelo ID
 *     tags: [NovoImovel]
 *     parameters:
 *       - in: path
 *         name: id_novo_imovel
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do novo imóvel
 *     responses:
 *       200:
 *         description: Novo imóvel deletado com sucesso.
 *       404:
 *         description: Novo imóvel não encontrado.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NovoImovel:
 *       type: object
 *       properties:
 *         id_novo_imovel:
 *           type: integer
 *           description: ID do novo imóvel.
 *         id_info:
 *           type: integer
 *           description: ID da informação do imóvel.
 *         tem_condominio:
 *           type: integer
 *           description: Indica se o imóvel está em condomínio (0 não, 1 sim).
 *         id_condominio:
 *           type: integer
 *           description: ID do condomínio do imóvel.
 *         id_proprietario:
 *           type: integer
 *           description: ID do proprietário do imóvel.
 *         id_comodos:
 *           type: integer
 *           description: ID dos cômodos do imóvel.
 *         id_medidas:
 *           type: integer
 *           description: ID das medidas do imóvel.
 *         id_preco:
 *           type: integer
 *           description: ID do preço do imóvel.
 *         id_minhas_caracteristicas:
 *           type: integer
 *           description: ID das características do imóvel.
 *         id_localizacao:
 *           type: integer
 *           description: ID da localização do imóvel.
 *         id_minhas_proximidades:
 *           type: integer
 *           description: ID das proximidades do imóvel.
 *         id_descricao:
 *           type: integer
 *           description: ID da descrição do imóvel.
 *         id_complemento:
 *           type: integer
 *           description: ID dos complementos do imóvel.
 *       required:
 *         - id_info
 *         - tem_condominio
 *         - id_proprietario
 *       example:
 *         id_novo_imovel: 1
 *         id_info: 2
 *         tem_condominio: 1
 *         id_condominio: 3
 *         id_proprietario: 4
 *         id_comodos: 5
 *         id_medidas: 6
 *         id_preco: 7
 *         id_minhas_caracteristicas: 8
 *         id_localizacao: 9
 *         id_minhas_proximidades: 10
 *         id_descricao: 11
 *         id_complemento: 12
 */



module.exports = router;
