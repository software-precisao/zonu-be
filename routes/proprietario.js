const express = require("express");
const router = express.Router();

const proprietarioController = require("../controllers/proprietarioController");

router.get("/", proprietarioController.obterProprietarios);
router.get("/:id_user", proprietarioController.obterProprietarioPorId);
router.post("/cadastro", proprietarioController.criarProprietario);
router.put("/:id_proprietario", proprietarioController.atualizarProprietario);
router.delete("/:id_proprietario", proprietarioController.deletarProprietario);


/**
 * @swagger
 * tags:
 *   name: Proprietarios
 *   description: Gerenciamento de proprietários
 */

/**
 * @swagger
 * /proprietarios:
 *   get:
 *     summary: Lista todos os proprietários
 *     tags: [Proprietarios]
 *     responses:
 *       200:
 *         description: Lista de proprietários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Proprietario'
 *   post:
 *     summary: Cria um novo proprietário
 *     tags: [Proprietarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proprietario'
 *     responses:
 *       201:
 *         description: Proprietário criado com sucesso.
 *       500:
 *         description: Erro ao criar o proprietário.
 */

/**
 * @swagger
 * /proprietarios/{id_proprietario}:
 *   get:
 *     summary: Obtém um proprietário pelo ID
 *     tags: [Proprietarios]
 *     parameters:
 *       - in: path
 *         name: id_proprietario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do proprietário
 *     responses:
 *       200:
 *         description: Proprietário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proprietario'
 *       404:
 *         description: Proprietário não encontrado.
 *   put:
 *     summary: Atualiza um proprietário pelo ID
 *     tags: [Proprietarios]
 *     parameters:
 *       - in: path
 *         name: id_proprietario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do proprietário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proprietario'
 *     responses:
 *       200:
 *         description: Proprietário atualizado com sucesso.
 *       404:
 *         description: Proprietário não encontrado.
 *   delete:
 *     summary: Deleta um proprietário pelo ID
 *     tags: [Proprietarios]
 *     parameters:
 *       - in: path
 *         name: id_proprietario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do proprietário
 *     responses:
 *       200:
 *         description: Proprietário deletado com sucesso.
 *       404:
 *         description: Proprietário não encontrado.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Proprietario:
 *       type: object
 *       properties:
 *         id_proprietario:
 *           type: integer
 *           description: ID do proprietário.
 *         nome:
 *           type: string
 *           description: Nome do proprietário.
 *         email:
 *           type: string
 *           description: E-mail do proprietário.
 *         data_nascimento:
 *           type: string
 *           description: Data de nascimento do proprietário.
 *         categoria:
 *           type: integer
 *           description: Categoria do proprietário.
 *         telefone1:
 *           type: string
 *           description: Telefone primário do proprietário.
 *         telefone2:
 *           type: string
 *           description: Telefone secundário do proprietário.
 *         id_user:
 *           type: integer
 *           description: ID do usuário associado ao proprietário.
 *         id_corretor:
 *           type: integer
 *           description: ID do corretor associado ao proprietário.
 *       required:
 *         - nome
 *         - email
 *         - data_nascimento
 *         - telefone1
 *         - telefone2
 *       example:
 *         id_proprietario: 1
 *         nome: "João Silva"
 *         email: "joao.silva@example.com"
 *         data_nascimento: "1980-04-01"
 *         categoria: 1
 *         telefone1: "(11) 99999-9999"
 *         telefone2: "(11) 99999-8888"
 *         id_user: 2
 *         id_corretor: 3
 */



module.exports = router;
