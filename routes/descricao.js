const express = require("express");
const router = express.Router();

const descricaoController = require("../controllers/descricaoController");

router.get("/", descricaoController.obterDescricoes);
router.get("/:id_descricao", descricaoController.obterDescricaoPorId);
router.post("/cadastro", descricaoController.criarDescricao);
router.put("/:id_descricao", descricaoController.atualizarDescricao);
router.delete("/:id_descricao", descricaoController.deletarDescricao);


/**
 * @swagger
 * tags:
 *   name: Descricao
 *   description: Gerenciamento das descrições dos imóveis
 */

/**
 * @swagger
 * /descricao:
 *   get:
 *     summary: Lista todas as descrições
 *     tags: [Descricao]
 *     responses:
 *       200:
 *         description: Lista de descrições retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Descricao'
 *   post:
 *     summary: Cria uma nova descrição
 *     tags: [Descricao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Descricao'
 *     responses:
 *       201:
 *         description: Descrição criada com sucesso.
 *       500:
 *         description: Erro ao criar a descrição.
 */

/**
 * @swagger
 * /descricao/{id_descricao}:
 *   get:
 *     summary: Obtém uma descrição pelo ID
 *     tags: [Descricao]
 *     parameters:
 *       - in: path
 *         name: id_descricao
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da descrição
 *     responses:
 *       200:
 *         description: Descrição encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Descricao'
 *       404:
 *         description: Descrição não encontrada.
 *   put:
 *     summary: Atualiza uma descrição pelo ID
 *     tags: [Descricao]
 *     parameters:
 *       - in: path
 *         name: id_descricao
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da descrição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Descricao'
 *     responses:
 *       200:
 *         description: Descrição atualizada com sucesso.
 *       404:
 *         description: Descrição não encontrada.
 *   delete:
 *     summary: Deleta uma descrição pelo ID
 *     tags: [Descricao]
 *     parameters:
 *       - in: path
 *         name: id_descricao
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da descrição
 *     responses:
 *       200:
 *         description: Descrição deletada com sucesso.
 *       404:
 *         description: Descrição não encontrada.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Descricao:
 *       type: object
 *       properties:
 *         id_descricao:
 *           type: integer
 *           description: ID da descrição.
 *         titulo:
 *           type: string
 *           description: Título da descrição.
 *         apresentacao:
 *           type: string
 *           description: Texto de apresentação da descrição.
 *         id_user:
 *           type: integer
 *           description: ID do usuário associado à descrição.
 *       required:
 *         - titulo
 *         - apresentacao
 *       example:
 *         id_descricao: 1
 *         titulo: "Excelente imóvel no centro"
 *         apresentacao: "Apartamento amplo com 3 quartos, sala, cozinha e 2 banheiros."
 *         id_user: 2
 */



module.exports = router;
