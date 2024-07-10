const express = require("express");
const router = express.Router();

const comodosController = require("../controllers/comodoController");

router.get("/", comodosController.obterComodos);
router.get("/:id_comodos", comodosController.obterComodoPorId);
router.post("/cadastro", comodosController.criarComodo);
router.put("/:id_comodos", comodosController.atualizarComodo);
router.delete("/:id_comodos", comodosController.deletarComodo);


/**
 * @swagger
 * tags:
 *   name: Comodos
 *   description: Gerenciamento dos cômodos dos imóveis
 */

/**
 * @swagger
 * /comodos:
 *   get:
 *     summary: Lista todos os cômodos
 *     tags: [Comodos]
 *     responses:
 *       200:
 *         description: Lista de cômodos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comodo'
 *   post:
 *     summary: Cria um novo cômodo
 *     tags: [Comodos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comodo'
 *     responses:
 *       201:
 *         description: Cômodo criado com sucesso.
 *       500:
 *         description: Erro ao criar o cômodo.
 */

/**
 * @swagger
 * /comodos/{id_comodos}:
 *   get:
 *     summary: Obtém um cômodo pelo ID
 *     tags: [Comodos]
 *     parameters:
 *       - in: path
 *         name: id_comodos
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cômodo
 *     responses:
 *       200:
 *         description: Cômodo encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comodo'
 *       404:
 *         description: Cômodo não encontrado.
 *   put:
 *     summary: Atualiza um cômodo pelo ID
 *     tags: [Comodos]
 *     parameters:
 *       - in: path
 *         name: id_comodos
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cômodo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comodo'
 *     responses:
 *       200:
 *         description: Cômodo atualizado com sucesso.
 *       404:
 *         description: Cômodo não encontrado.
 *   delete:
 *     summary: Deleta um cômodo pelo ID
 *     tags: [Comodos]
 *     parameters:
 *       - in: path
 *         name: id_comodos
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cômodo
 *     responses:
 *       200:
 *         description: Cômodo deletado com sucesso.
 *       404:
 *         description: Cômodo não encontrado.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comodo:
 *       type: object
 *       properties:
 *         id_comodos:
 *           type: integer
 *           description: ID do cômodo.
 *         dormitorio:
 *           type: string
 *           description: Descrição do dormitório.
 *         suite:
 *           type: string
 *           description: Descrição da suíte.
 *         banheiro:
 *           type: string
 *           description: Descrição do banheiro.
 *         garagem:
 *           type: string
 *           description: Descrição da garagem.
 *         garagem_coberta:
 *           type: string
 *           description: Descrição da garagem coberta.
 *         garagem_box:
 *           type: string
 *           description: Descrição do box da garagem.
 *         sala_tv:
 *           type: string
 *           description: Descrição da sala de TV.
 *         sala_jantar:
 *           type: string
 *           description: Descrição da sala de jantar.
 *         sala_estar:
 *           type: string
 *           description: Descrição da sala de estar.
 *         lavabo:
 *           type: string
 *           description: Descrição do lavabo.
 *         area_servico:
 *           type: string
 *           description: Descrição da área de serviço.
 *         cozinha:
 *           type: string
 *           description: Descrição da cozinha.
 *         closet:
 *           type: string
 *           description: Descrição do closet.
 *         escritorio:
 *           type: string
 *           description: Descrição do escritório.
 *         casa_empregada:
 *           type: string
 *           description: Descrição da casa do empregado.
 *         copa:
 *           type: string
 *           description: Descrição da copa.
 *         id_user:
 *           type: integer
 *           description: ID do usuário associado ao cômodo.
 *       required:
 *         - dormitorio
 *         - suite
 *         - banheiro
 *         - garagem
 *         - garagem_coberta
 *         - garagem_box
 *         - sala_tv
 *         - sala_jantar
 *         - sala_estar
 *         - lavabo
 *         - area_servico
 *         - cozinha
 *         - closet
 *         - escritorio
 *         - casa_empregada
 *         - copa
 *       example:
 *         id_comodos: 1
 *         dormitorio: "1"
 *         suite: "1"
 *         banheiro: "1"
 *         garagem: "2"
 *         garagem_coberta: "1"
 *         garagem_box: "1"
 *         sala_tv: "1"
 *         sala_jantar: "1"
 *         sala_estar: "1"
 *         lavabo: "1"
 *         area_servico: "1"
 *         cozinha: "1"
 *         closet: "1"
 *         escritorio: "1"
 *         casa_empregada: "1"
 *         copa: "1"
 *         id_user: 2
 */



module.exports = router;
