const express = require("express");
const router = express.Router();

const novoCondominioController = require("../controllers/condominioController");

router.get("/", novoCondominioController.obterCondominios);
router.get("/:id_user", novoCondominioController.obterCondominioPorId);
router.post("/cadastro", novoCondominioController.criarCondominio);
router.put("/:id_condominio", novoCondominioController.atualizarCondominio);
router.delete("/:id_condominio", novoCondominioController.deletarCondominio);


/**
 * @swagger
 * tags:
 *   name: Condominio
 *   description: Gerenciamento dos condomínios
 */

/**
 * @swagger
 * /condominios:
 *   get:
 *     summary: Lista todos os condomínios
 *     tags: [Condominio]
 *     responses:
 *       200:
 *         description: Lista de condomínios retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NovoCondominio'
 *   post:
 *     summary: Cria um novo condomínio
 *     tags: [Condominio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoCondominioInput'
 *     responses:
 *       201:
 *         description: Condomínio criado com sucesso.
 *       500:
 *         description: Erro ao criar o condomínio.
 */

/**
 * @swagger
 * /condominios/{id_condominio}:
 *   get:
 *     summary: Obtém um condomínio pelo ID
 *     tags: [Condominio]
 *     parameters:
 *       - in: path
 *         name: id_condominio
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do condomínio
 *     responses:
 *       200:
 *         description: Condomínio encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NovoCondominio'
 *       404:
 *         description: Condomínio não encontrado.
 *   put:
 *     summary: Atualiza um condomínio pelo ID
 *     tags: [Condominio]
 *     parameters:
 *       - in: path
 *         name: id_condominio
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do condomínio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoCondominioInput'
 *     responses:
 *       200:
 *         description: Condomínio atualizado com sucesso.
 *       404:
 *         description: Condomínio não encontrado.
 *   delete:
 *     summary: Deleta um condomínio pelo ID
 *     tags: [Condominio]
 *     parameters:
 *       - in: path
 *         name: id_condominio
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do condomínio
 *     responses:
 *       200:
 *         description: Condomínio deletado com sucesso.
 *       404:
 *         description: Condomínio não encontrado.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NovoCondominioInput:
 *       type: object
 *       properties:
 *         id_info_condominio:
 *           type: integer
 *           description: ID das informações do condomínio.
 *         id_localizacao_condominio:
 *           type: integer
 *           description: ID da localização do condomínio.
 *         id_minhas_caracteristicas_condominio:
 *           type: integer
 *           description: ID das características do condomínio.
 *         id_minhas_proximidades_condominio:
 *           type: integer
 *           description: ID das proximidades do condomínio.
 *         id_user:
 *           type: integer
 *           description: ID do usuário associado ao condomínio.
 *       example:
 *         id_info_condominio: 1
 *         id_localizacao_condominio: 2
 *         id_minhas_caracteristicas_condominio: 3
 *         id_minhas_proximidades_condominio: 4
 *         id_user: 5
 *     NovoCondominio:
 *       type: object
 *       properties:
 *         id_condominio:
 *           type: integer
 *           description: ID do condomínio.
 *         id_info_condominio:
 *           type: integer
 *           description: ID das informações do condomínio.
 *         id_localizacao_condominio:
 *           type: integer
 *           description: ID da localização do condomínio.
 *         id_minhas_caracteristicas_condominio:
 *           type: integer
 *           description: ID das características do condomínio.
 *         id_minhas_proximidades_condominio:
 *           type: integer
 *           description: ID das proximidades do condomínio.
 *         id_user:
 *           type: integer
 *           description: ID do usuário associado ao condomínio.
 *       example:
 *         id_condominio: 1
 *         id_info_condominio: 1
 *         id_localizacao_condominio: 2
 *         id_minhas_caracteristicas_condominio: 3
 *         id_minhas_proximidades_condominio: 4
 *         id_user: 5
 */



module.exports = router;
