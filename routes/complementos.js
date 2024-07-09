const express = require("express");
const router = express.Router();

const complementoController = require("../controllers/complementosController");

router.get("/", complementoController.obterComplementos);
router.get("/:id_complemento", complementoController.obterComplementoPorId);
router.post("/cadastro", complementoController.criarComplemento);
router.put("/:id_complemento", complementoController.atualizarComplemento);
router.delete("/:id_complemento", complementoController.deletarComplemento);


/**
 * @swagger
 * /complementos:
 *   get:
 *     summary: Retorna todos os complementos.
 *     description: Retorna uma lista de todos os complementos cadastrados.
 *     responses:
 *       200:
 *         description: Lista de complementos retornada com sucesso.
 *   post:
 *     summary: Cria um novo complemento.
 *     description: Cria um novo complemento com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link_youtube:
 *                 type: string
 *                 description: O link do vídeo do YouTube.
 *               link_apresentacao:
 *                 type: string
 *                 description: O link da apresentação.
 *               id_user:
 *                 type: integer
 *                 description: O ID do usuário associado ao complemento (opcional).
 *     responses:
 *       201:
 *         description: Complemento criado com sucesso.
 *   servers:
 *     - url: https://www.zonu.com.br/api
 */

/**
 * @swagger
 * /complementos/{id_complemento}:
 *   get:
 *     summary: Retorna um complemento pelo ID.
 *     description: Retorna um complemento específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id_complemento
 *         required: true
 *         description: ID do complemento a ser retornado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Complemento retornado com sucesso.
 *   put:
 *     summary: Atualiza um complemento existente.
 *     description: Atualiza um complemento existente com os dados fornecidos.
 *     parameters:
 *       - in: path
 *         name: id_complemento
 *         required: true
 *         description: ID do complemento a ser atualizado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link_youtube:
 *                 type: string
 *                 description: O link atualizado do vídeo do YouTube.
 *               link_apresentacao:
 *                 type: string
 *                 description: O link atualizado da apresentação.
 *               id_user:
 *                 type: integer
 *                 description: O ID do usuário atualizado associado ao complemento (opcional).
 *     responses:
 *       200:
 *         description: Complemento atualizado com sucesso.
 *   delete:
 *     summary: Deleta um complemento pelo ID.
 *     description: Deleta um complemento específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id_complemento
 *         required: true
 *         description: ID do complemento a ser deletado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Complemento deletado com sucesso.
 *   servers:
 *     - url: https://www.zonu.com.br/api
 */



module.exports = router;
