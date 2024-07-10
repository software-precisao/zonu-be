const express = require("express");
const router = express.Router();

const precoController = require("../controllers/precoController");

router.get("/", precoController.obterPrecos);
router.get("/:id_preco", precoController.obterPrecoPorId);
router.post("/cadastro", precoController.criarPreco);
router.put("/:id_preco", precoController.atualizarPreco);
router.delete("/:id_preco", precoController.deletarPreco);


/**
 * @swagger
 * tags:
 *   name: Precos
 *   description: Gerenciamento de preços
 */

/**
 * @swagger
 * /precos:
 *   get:
 *     summary: Lista todos os preços
 *     tags: [Precos]
 *     responses:
 *       200:
 *         description: Lista de preços retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Preco'
 *   post:
 *     summary: Cria um novo preço
 *     tags: [Precos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Preco'
 *     responses:
 *       201:
 *         description: Preço criado com sucesso.
 *       500:
 *         description: Erro ao criar o preço.
 */

/**
 * @swagger
 * /precos/{id_preco}:
 *   get:
 *     summary: Obtém um preço pelo ID
 *     tags: [Precos]
 *     parameters:
 *       - in: path
 *         name: id_preco
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do preço
 *     responses:
 *       200:
 *         description: Preço encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preco'
 *       404:
 *         description: Preço não encontrado.
 *   put:
 *     summary: Atualiza um preço pelo ID
 *     tags: [Precos]
 *     parameters:
 *       - in: path
 *         name: id_preco
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do preço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Preco'
 *     responses:
 *       200:
 *         description: Preço atualizado com sucesso.
 *       404:
 *         description: Preço não encontrado.
 *   delete:
 *     summary: Deleta um preço pelo ID
 *     tags: [Precos]
 *     parameters:
 *       - in: path
 *         name: id_preco
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do preço
 *     responses:
 *       200:
 *         description: Preço deletado com sucesso.
 *       404:
 *         description: Preço não encontrado.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Preco:
 *       type: object
 *       properties:
 *         id_preco:
 *           type: integer
 *           description: ID do preço.
 *         tipo_negocio:
 *           type: string
 *           description: Tipo de negócio (venda, aluguel, etc.).
 *         preco_imovel:
 *           type: string
 *           description: Preço do imóvel.
 *         mostra_preco:
 *           type: string
 *           description: Indica se o preço é mostrado ou não.
 *         text_preco_opcao:
 *           type: string
 *           description: Texto opcional relacionado ao preço.
 *         preco_iptu:
 *           type: string
 *           description: Valor do IPTU.
 *         periodo:
 *           type: string
 *           description: Periodicidade do pagamento.
 *         preco_condominio:
 *           type: string
 *           description: Valor do condomínio.
 *         financiado:
 *           type: string
 *           description: Indica se o imóvel é financiado.
 *         aceita_financiamento:
 *           type: string
 *           description: Indica se aceita financiamento.
 *         minhacasa_minhavisa:
 *           type: string
 *           description: Elegibilidade para o programa Minha Casa Minha Vida.
 *         total_mensal_taxas:
 *           type: string
 *           description: Total de taxas mensais.
 *         descricao_taxas:
 *           type: string
 *           description: Descrição das taxas.
 *         aceita_permuta:
 *           type: string
 *           description: Indica se aceita permuta.
 *         descricao_permuta:
 *           type: string
 *           description: Descrição sobre a permuta.
 *         id_user:
 *           type: integer
 *           description: ID do usuário associado.
 *       required:
 *         - tipo_negocio
 *         - preco_imovel
 */



module.exports = router;
