const express = require("express");
const router = express.Router();

const proximidadesController = require("../controllers/proximidadesController");

router.get("/", proximidadesController.obterProximidades);
router.get("/user/:id_user", proximidadesController.obterProximidadePorId);
router.post("/cadastro", proximidadesController.criarProximidade);
router.put("/:id_proximidade", proximidadesController.atualizarProximidade);
router.delete("/delete/:id_proximidade", proximidadesController.deletarProximidade);


/**
 * @swagger
 * tags:
 *   name: Proximidades
 *   description: Gerenciamento de proximidades
 */

/**
 * @swagger
 * /proximidades:
 *   get:
 *     summary: Lista todas as proximidades
 *     tags: [Proximidades]
 *     responses:
 *       200:
 *         description: Lista de proximidades retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Proximidade'
 *   post:
 *     summary: Cria uma nova proximidade
 *     tags: [Proximidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proximidade'
 *     responses:
 *       201:
 *         description: Proximidade criada com sucesso.
 *       500:
 *         description: Erro ao criar a proximidade.
 */

/**
 * @swagger
 * /proximidades/{id_proximidade}:
 *   get:
 *     summary: Obtém uma proximidade pelo ID
 *     tags: [Proximidades]
 *     parameters:
 *       - in: path
 *         name: id_proximidade
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da proximidade
 *     responses:
 *       200:
 *         description: Proximidade encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proximidade'
 *       404:
 *         description: Proximidade não encontrada.
 *   put:
 *     summary: Atualiza uma proximidade pelo ID
 *     tags: [Proximidades]
 *     parameters:
 *       - in: path
 *         name: id_proximidade
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da proximidade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proximidade'
 *     responses:
 *       200:
 *         description: Proximidade atualizada com sucesso.
 *       404:
 *         description: Proximidade não encontrada.
 *   delete:
 *     summary: Deleta uma proximidade pelo ID
 *     tags: [Proximidades]
 *     parameters:
 *       - in: path
 *         name: id_proximidade
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da proximidade
 *     responses:
 *       200:
 *         description: Proximidade deletada com sucesso.
 *       404:
 *         description: Proximidade não encontrada.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Proximidade:
 *       type: object
 *       properties:
 *         id_proximidade:
 *           type: integer
 *           description: ID da proximidade.
 *         nome_proximidade:
 *           type: string
 *           description: Nome da proximidade.
 *         id_user:
 *           type: integer
 *           description: ID do usuário associado à proximidade.
 *       required:
 *         - nome_proximidade
 *       example:
 *         id_proximidade: 1
 *         nome_proximidade: "Parque das Árvores"
 *         id_user: 2
 */



module.exports = router;
