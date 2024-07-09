const express = require("express");
const router = express.Router();

const infoController = require("../controllers/infoImovelController");

router.get("/", infoController.obterInfos);
router.get("/:id_info", infoController.obterInfoPorId);
router.post("/cadastro", infoController.criarInfo);
router.put("/:id_info", infoController.atualizarInfo);
router.delete("/:id_info", infoController.deletarInfo);


/**
 * @swagger
 * tags:
 *   name: InfoImovel
 *   description: Gerenciamento das informações dos imóveis
 */

/**
 * @swagger
 * /infoImovel:
 *   get:
 *     summary: Lista todas as informações dos imóveis
 *     tags: [InfoImovel]
 *     responses:
 *       200:
 *         description: Lista de informações dos imóveis retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InfoImovel'
 *   post:
 *     summary: Cria uma nova informação de imóvel
 *     tags: [InfoImovel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InfoImovel'
 *     responses:
 *       201:
 *         description: Informação de imóvel criada com sucesso.
 *       500:
 *         description: Erro ao criar a informação do imóvel.
 */

/**
 * @swagger
 * /infoImovel/{id_info}:
 *   get:
 *     summary: Obtém uma informação de imóvel pelo ID
 *     tags: [InfoImovel]
 *     parameters:
 *       - in: path
 *         name: id_info
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da informação do imóvel
 *     responses:
 *       200:
 *         description: Informação de imóvel encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InfoImovel'
 *       404:
 *         description: Informação de imóvel não encontrada.
 *   put:
 *     summary: Atualiza uma informação de imóvel pelo ID
 *     tags: [InfoImovel]
 *     parameters:
 *       - in: path
 *         name: id_info
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da informação do imóvel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InfoImovel'
 *     responses:
 *       200:
 *         description: Informação de imóvel atualizada com sucesso.
 *       404:
 *         description: Informação de imóvel não encontrada.
 *   delete:
 *     summary: Deleta uma informação de imóvel pelo ID
 *     tags: [InfoImovel]
 *     parameters:
 *       - in: path
 *         name: id_info
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da informação do imóvel
 *     responses:
 *       200:
 *         description: Informação de imóvel deletada com sucesso.
 *       404:
 *         description: Informação de imóvel não encontrada.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InfoImovel:
 *       type: object
 *       properties:
 *         id_info:
 *           type: integer
 *           description: ID da informação do imóvel.
 *         cod_referencia:
 *           type: string
 *           description: Código de referência do imóvel.
 *         corretor:
 *           type: string
 *           description: Corretor responsável pelo imóvel.
 *         agenciador:
 *           type: string
 *           description: Agenciador do imóvel.
 *         tipo:
 *           type: string
 *           description: Tipo do imóvel.
 *         perfil_imovel:
 *           type: string
 *           description: Perfil do imóvel.
 *         situacao_imovel:
 *           type: string
 *           description: Situação do imóvel.
 *         ano_construcao:
 *           type: string
 *           description: Ano de construção do imóvel.
 *         incorporacao:
 *           type: string
 *           description: Incorporação do imóvel.
 *         posicao_solar:
 *           type: string
 *           description: Posição solar do imóvel.
 *         terreno:
 *           type: string
 *           description: Terreno do imóvel.
 *         proximo_mar:
 *           type: string
 *           description: Proximidade com o mar.
 *         averbado:
 *           type: string
 *           description: Se o imóvel é averbado.
 *         escriturado:
 *           type: string
 *           description: Se o imóvel é escriturado.
 *         esquina:
 *           type: string
 *           description: Se o imóvel fica na esquina.
 *         mobilia:
 *           type: string
 *           description: Mobília incluída.
 *         id_user:
 *           type: integer
 *           description: ID do usuário associado ao imóvel.
 *       required:
 *         - cod_referencia
 *         - corretor
 *         - agenciador
 *         - tipo
 *         - perfil_imovel
 *         - situacao_imovel
 *         - ano_construcao
 *         - incorporacao
 *         - posicao_solar
 *         - terreno
 *       example:
 *         id_info: 1
 *         cod_referencia: "REF123"
 *         corretor: "João Silva"
 *         agenciador: "Maria Oliveira"
 *         tipo: "Apartamento"
 *         perfil_imovel: "Residencial"
 *         situacao_imovel: "Novo"
 *         ano_construcao: "2020"
 *         incorporacao: "XYZ Incorporações"
 *         posicao_solar: "Norte"
 *         terreno: "200m²"
 *         proximo_mar: "Sim"
 *         averbado: "Não"
 *         escriturado: "Sim"
 *         esquina: "Não"
 *         mobilia: "Completa"
 *         id_user: 2
 */



module.exports = router;
