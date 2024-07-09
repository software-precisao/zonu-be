const express = require("express");
const router = express.Router();

const medidasController = require("../controllers/medidasController");

router.get("/", medidasController.obterMedidas);
router.get("/:id_medidas", medidasController.obterMedidaPorId);
router.post("/cadastro", medidasController.criarMedida);
router.put("/:id_medidas", medidasController.atualizarMedida);
router.delete("/:id_medidas", medidasController.deletarMedida);


/**
 * @swagger
 * tags:
 *   name: Medidas
 *   description: Gerenciamento das medidas dos imóveis
 */

/**
 * @swagger
 * /medidas:
 *   get:
 *     summary: Lista todas as medidas
 *     tags: [Medidas]
 *     responses:
 *       200:
 *         description: Lista de medidas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medidas'
 *   post:
 *     summary: Cria uma nova medida
 *     tags: [Medidas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medidas'
 *     responses:
 *       201:
 *         description: Medida criada com sucesso.
 *       500:
 *         description: Erro ao criar a medida.
 */

/**
 * @swagger
 * /medidas/{id_medidas}:
 *   get:
 *     summary: Obtém uma medida pelo ID
 *     tags: [Medidas]
 *     parameters:
 *       - in: path
 *         name: id_medidas
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da medida
 *     responses:
 *       200:
 *         description: Medida encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medidas'
 *       404:
 *         description: Medida não encontrada.
 *   put:
 *     summary: Atualiza uma medida pelo ID
 *     tags: [Medidas]
 *     parameters:
 *       - in: path
 *         name: id_medidas
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da medida
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medidas'
 *     responses:
 *       200:
 *         description: Medida atualizada com sucesso.
 *       404:
 *         description: Medida não encontrada.
 *   delete:
 *     summary: Deleta uma medida pelo ID
 *     tags: [Medidas]
 *     parameters:
 *       - in: path
 *         name: id_medidas
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da medida
 *     responses:
 *       200:
 *         description: Medida deletada com sucesso.
 *       404:
 *         description: Medida não encontrada.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Medidas:
 *       type: object
 *       properties:
 *         id_medidas:
 *           type: integer
 *           description: ID da medida.
 *         area_contruida:
 *           type: string
 *           description: Área construída do imóvel.
 *         area_privativa:
 *           type: string
 *           description: Área privativa do imóvel.
 *         area_total:
 *           type: string
 *           description: Área total do imóvel.
 *         id_user:
 *           type: integer
 *           description: ID do usuário associado.
 *       required:
 *         - id_medidas
 *       example:
 *         id_medidas: 1
 *         area_contruida: "120m²"
 *         area_privativa: "100m²"
 *         area_total: "200m²"
 *         id_user: 2
 */



module.exports = router;
