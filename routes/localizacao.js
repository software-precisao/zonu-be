const express = require("express");
const router = express.Router();

const Usuario = require('../models/tb_usuarios');

const localizacaoController = require("../controllers/localizacaoController");

router.get("/", localizacaoController.obterLocalizacoes);
router.get("/:id_localizacao", localizacaoController.obterLocalizacaoPorId);
router.post("/cadastro", localizacaoController.criarLocalizacao);
router.put("/:id_localizacao", localizacaoController.atualizarLocalizacao);
router.delete("/:id_localizacao", localizacaoController.deletarLocalizacao);


/**
 * @swagger
 * tags:
 *   name: Localizacao
 *   description: Gerenciamento das localizações
 */

/**
 * @swagger
 * /localizacao:
 *   get:
 *     summary: Lista todas as localizações
 *     tags: [Localizacao]
 *     responses:
 *       200:
 *         description: Lista de localizações retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Localizacao'
 *   post:
 *     summary: Cria uma nova localização
 *     tags: [Localizacao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Localizacao'
 *     responses:
 *       201:
 *         description: Localização criada com sucesso.
 *       500:
 *         description: Erro ao criar a localização.
 */

/**
 * @swagger
 * /localizacao/{id_localizacao}:
 *   get:
 *     summary: Obtém uma localização pelo ID
 *     tags: [Localizacao]
 *     parameters:
 *       - in: path
 *         name: id_localizacao
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da localização
 *     responses:
 *       200:
 *         description: Localização encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Localizacao'
 *       404:
 *         description: Localização não encontrada.
 *   put:
 *     summary: Atualiza uma localização pelo ID
 *     tags: [Localizacao]
 *     parameters:
 *       - in: path
 *         name: id_localizacao
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da localização
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Localizacao'
 *     responses:
 *       200:
 *         description: Localização atualizada com sucesso.
 *       404:
 *         description: Localização não encontrada.
 *   delete:
 *     summary: Deleta uma localização pelo ID
 *     tags: [Localizacao]
 *     parameters:
 *       - in: path
 *         name: id_localizacao
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da localização
 *     responses:
 *       200:
 *         description: Localização deletada com sucesso.
 *       404:
 *         description: Localização não encontrada.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Localizacao:
 *       type: object
 *       properties:
 *         id_localizacao:
 *           type: integer
 *           description: ID da localização.
 *         cep:
 *           type: string
 *           description: CEP da localização.
 *         pais:
 *           type: string
 *           description: País da localização.
 *         estado:
 *           type: string
 *           description: Estado da localização.
 *         cidade:
 *           type: string
 *           description: Cidade da localização.
 *         bairro:
 *           type: string
 *           description: Bairro da localização.
 *         zona:
 *           type: string
 *           description: Zona da localização.
 *         logradouro:
 *           type: string
 *           description: Logradouro da localização.
 *         numero:
 *           type: string
 *           description: Número do endereço.
 *         complemento:
 *           type: string
 *           description: Complemento do endereço.
 *         numero_unidade:
 *           type: string
 *           description: Número da unidade.
 *         andar:
 *           type: string
 *           description: Andar da unidade.
 *         unidade_por_andar:
 *           type: string
 *           description: Unidades por andar.
 *         total_andar:
 *           type: string
 *           description: Total de andares.
 *         total_torres:
 *           type: string
 *           description: Total de torres.
 *         mostrar_andar_site:
 *           type: string
 *           description: Mostrar andar no site.
 *         mostrar_numero_unidade_site:
 *           type: string
 *           description: Mostrar número da unidade no site.
 *         mostrar_logradouro_site:
 *           type: string
 *           description: Mostrar logradouro no site.
 *         mostrar_bairro_site:
 *           type: string
 *           description: Mostrar bairro no site.
 *         mostrar_complemento_site:
 *           type: string
 *           description: Mostrar complemento no site.
 *         mostrar_numero_site:
 *           type: string
 *           description: Mostrar número no site.
 *         mostrar_nome_condominio_site:
 *           type: string
 *           description: Mostrar nome do condomínio no site.
 *         mostrar_mapa_site:
 *           type: string
 *           description: Mostrar mapa no site.
 *         mostrar_localizacao_site:
 *           type: string
 *           description: Mostrar localização no site.
 *         id_user:
 *           type: integer
 *           description: ID do usuário associado à localização.
 *       required:
 *         - id_user
 *       example:
 *         id_localizacao: 1
 *         cep: "00000-000"
 *         pais: "Brasil"
 *         estado: "São Paulo"
 *         cidade: "São Paulo"
 *         bairro: "Centro"
 *         zona: "Zona Sul"
 *         logradouro: "Av. Paulista"
 *         numero: "1000"
 *         complemento: "Apto 101"
 *         numero_unidade: "101"
 *         andar: "10"
 *         unidade_por_andar: "4"
 *         total_andar: "15"
 *         total_torres: "2"
 *         mostrar_andar_site: "Sim"
 *         mostrar_numero_unidade_site: "Sim"
 *         mostrar_logradouro_site: "Sim"
 *         mostrar_bairro_site: "Sim"
 *         mostrar_complemento_site: "Não"
 *         mostrar_numero_site: "Sim"
 *         mostrar_nome_condominio_site: "Sim"
 *         mostrar_mapa_site: "Sim"
 *         mostrar_localizacao_site: "Sim"
 *         id_user: 2
 */



module.exports = router;
