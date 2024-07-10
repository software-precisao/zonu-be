const express = require("express");
const router = express.Router();
const planosController = require("../controllers/planoController");


router.get("/", planosController.buscarTodosPlanos);
router.post("/cadastrar", planosController.criarPlano);
router.get("/buscar/:id", planosController.buscarPlanoPorId);
router.put("/edit/:id", planosController.atualizarPlano);
router.delete("/delete/:id", planosController.deletarPlano);


/**
 * @swagger
 * tags:
 *   name: Planos
 *   description: Gerenciamento de planos
 */

/**
 * @swagger
 * /planos:
 *   get:
 *     summary: Lista todos os planos
 *     tags: [Planos]
 *     responses:
 *       200:
 *         description: Lista de planos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plano'
 *   post:
 *     summary: Cria um novo plano
 *     tags: [Planos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plano'
 *     responses:
 *       201:
 *         description: Plano criado com sucesso.
 *       500:
 *         description: Erro ao criar o plano.
 */

/**
 * @swagger
 * /planos/{id}:
 *   get:
 *     summary: Obtém um plano pelo ID
 *     tags: [Planos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do plano
 *     responses:
 *       200:
 *         description: Plano encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plano'
 *       404:
 *         description: Plano não encontrado.
 *   put:
 *     summary: Atualiza um plano pelo ID
 *     tags: [Planos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do plano
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plano'
 *     responses:
 *       200:
 *         description: Plano atualizado com sucesso.
 *       404:
 *         description: Plano não encontrado.
 *   delete:
 *     summary: Deleta um plano pelo ID
 *     tags: [Planos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do plano
 *     responses:
 *       200:
 *         description: Plano deletado com sucesso.
 *       404:
 *         description: Plano não encontrado.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Plano:
 *       type: object
 *       properties:
 *         id_plano:
 *           type: integer
 *           description: ID do plano.
 *         nome_plano:
 *           type: string
 *           description: Nome do plano.
 *         valor_plano:
 *           type: string
 *           description: Valor do plano.
 *         descricao:
 *           type: string
 *           description: Descrição do plano.
 *       required:
 *         - nome_plano
 *         - valor_plano
 *         - descricao
 *       example:
 *         id_plano: 1
 *         nome_plano: "Plano Premium"
 *         valor_plano: "R$ 99,99"
 *         descricao: "Acesso ilimitado a todos os recursos."
 */



module.exports = router;
