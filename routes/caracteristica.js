const express = require("express");
const router = express.Router();

const caracteristicaController = require("../controllers/caracteristicaController");

router.get("/", caracteristicaController.obterCaracteristicas);
router.get("/user/:id_user", caracteristicaController.obterCaracteristicaPorId);
router.post("/cadastro", caracteristicaController.criarCaracteristica);
router.put("/:id_caracteristica", caracteristicaController.atualizarCaracteristica);
router.delete("/delete/:id_caracteristica", caracteristicaController.deletarCaracteristica);


/**
 * @swagger
 * tags:
 *   name: Caracteristica
 *   description: Gerenciamento das características dos imóveis
 */

/**
 * @swagger
 * /caracteristicas:
 *   get:
 *     summary: Lista todas as características
 *     tags: [Caracteristica]
 *     responses:
 *       200:
 *         description: Lista de características retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caracteristica'
 *   post:
 *     summary: Cria uma nova característica
 *     tags: [Caracteristica]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caracteristica'
 *     responses:
 *       201:
 *         description: Característica criada com sucesso.
 *       500:
 *         description: Erro ao criar a característica.
 */

/**
 * @swagger
 * /caracteristicas/{id_caracteristica}:
 *   get:
 *     summary: Obtém uma característica pelo ID
 *     tags: [Caracteristica]
 *     parameters:
 *       - in: path
 *         name: id_caracteristica
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da característica
 *     responses:
 *       200:
 *         description: Característica encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caracteristica'
 *       404:
 *         description: Característica não encontrada.
 *   put:
 *     summary: Atualiza uma característica pelo ID
 *     tags: [Caracteristica]
 *     parameters:
 *       - in: path
 *         name: id_caracteristica
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da característica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caracteristica'
 *     responses:
 *       200:
 *         description: Característica atualizada com sucesso.
 *       404:
 *         description: Característica não encontrada.
 *   delete:
 *     summary: Deleta uma característica pelo ID
 *     tags: [Caracteristica]
 *     parameters:
 *       - in: path
 *         name: id_caracteristica
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da característica
 *     responses:
 *       200:
 *         description: Característica deletada com sucesso.
 *       404:
 *         description: Característica não encontrada.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Caracteristica:
 *       type: object
 *       properties:
 *         id_caracteristica:
 *           type: integer
 *           description: ID da característica.
 *         nome_caracteristica:
 *           type: string
 *           description: Nome da característica.
 *         id_user:
 *           type: integer
 *           description: ID do usuário associado à característica.
 *       required:
 *         - nome_caracteristica
 *       example:
 *         id_caracteristica: 1
 *         nome_caracteristica: "Piscina"
 *         id_user: 2
 */



module.exports = router;
