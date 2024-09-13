const Negocio = require("../models/tb_negocio");
const Cliente = require("../models/tb_clientes");
const Etapa = require("../models/tb_etapa");
const NivelInteresse = require("../models/tb_niveis_interesse");
const NovoImovel = require("../models/tb_imovel");
const Usuario = require("../models/tb_usuarios");
const TipoCliente = require("../models/tb_tipo_cliente");
const Captacao = require("../models/tb_captacao");
const CategoriaCliente = require("../models/tb_categoria_cliente");
const Condominio = require("../models/tb_condominio");
const Comodos = require("../models/tb_comodos");
const Medidas = require("../models/tb_medidas");
const Preco = require("../models/tb_preco");
const Localizacao = require("../models/tb_localizacao");
const Descricao = require("../models/tb_descricao");
const Complemento = require("../models/tb_complementos");
const Publicacao = require("../models/tb_publicacao");
const ImagemImovel = require("../models/tb_imagem_imovel");

const getNegocios = async (req, res) => {
  try {
    const negocios = await Negocio.findAll({
      attributes: {
        exclude: [
          "id_etapa",
          "id_nivel_interesse",
          "id_cliente",
          "id_imovel",
          "id_user",
        ],
      },
      include: [
        {
          model: Etapa,
          as: "Etapa",
          attributes: ["id_etapa", "nome_etapa", "dias_limpeza", "descricao"],
        },
        {
          model: NivelInteresse,
          as: "NivelInteresse",
          attributes: ["id_nivel_interesse", "nivel_interesse"],
        },
        {
          model: Cliente,
          as: "Cliente",
          include: [
            {
              model: TipoCliente,
              as: "TipoCliente",
              attributes: ["id_tipo_cliente", "tipo_cliente"],
            },
            {
              model: Captacao,
              as: "Captacao",
              attributes: ["id_captacao", "origem_captacao"],
            },
            {
              model: CategoriaCliente,
              as: "CategoriaCliente",
              attributes: ["id_categoria_cliente", "categoria_cliente"],
            },
          ],
        },
        {
          model: NovoImovel,
          as: "NovoImovel",
          include: [
            {
              model: Condominio,
              as: "condominio",
              attributes: ["nome_condominio"],
            },

            {
              model: Comodos,
              as: "comodos",
              attributes: ["dormitorio", "suite", "banheiro"],
            },
            {
              model: Medidas,
              as: "medidas",
              attributes: ["area_total", "area_contruida", "area_privativa"],
            },
            {
              model: Preco,
              as: "preco",
              attributes: ["preco_imovel"],
            },
            {
              model: Localizacao,
              as: "localizacao",
              attributes: ["cidade", "bairro", "logradouro", "numero", "cep"],
            },
            {
              model: Descricao,
              as: "descricao",
              attributes: ["titulo", "apresentacao"],
            },
            {
              model: Complemento,
              as: "complemento",
              attributes: ["link_youtube", "link_apresentacao", "link_drive"],
            },
            { 
              model: ImagemImovel,
              as: "fotos",
              attributes: ["foto"] 
            },
          ],
        },
        {
          model: Usuario,
          as: "Usuario",
        },
      ],
    });
    return res.status(200).json(negocios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createNegocio = async (req, res) => {
  try {
    const { id_etapa, id_nivel_interesse, id_cliente, id_imovel, id_user } =
      req.body;

    if ((!id_etapa, !id_nivel_interesse || !id_cliente || !id_imovel)) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const novoNegocio = await Negocio.create({
      id_etapa,
      id_nivel_interesse,
      id_cliente,
      id_imovel,
      id_user,
    });
    return res.status(201).json(novoNegocio);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateNegocio = async (req, res) => {
  try {
    const { id_negocio } = req.params;
    const { id_etapa, id_nivel_interesse, id_cliente, id_imovel, id_user } =
      req.body;

    const negocio = await Negocio.findByPk(id_negocio);
    if (!negocio) {
      return res.status(404).json({ message: "Negócio não encontrado" });
    }
    negocio.id_etapa = id_etapa || negocio.id_etapa;
    negocio.id_nivel_interesse =
      id_nivel_interesse || negocio.id_nivel_interesse;
    negocio.id_cliente = id_cliente || negocio.id_cliente;
    negocio.id_imovel = id_imovel || negocio.id_imovel;
    negocio.id_user = id_user || negocio.id_user;

    await negocio.save();
    return res.status(200).json(negocio);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateNegocioParaEtapa = async (req, res) => {
  try {
    const { id_negocio } = req.params;
    const { id_etapa } = req.body;

    if (!id_etapa) {
      return res.status(400).json({ message: "id_etapa é obrigatório" });
    }

    const negocio = await Negocio.findByPk(id_negocio);
    if (!negocio) {
      return res.status(404).json({ message: "Negócio não encontrado" });
    }

    negocio.id_etapa = id_etapa;
    await negocio.save();

    return res.status(200).json(negocio);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteNegocio = async (req, res) => {
  try {
    const { id_negocio } = req.params;
    const deletado = await Negocio.destroy({ where: { id_negocio } });

    if (deletado) {
      return res.status(200).json({ message: "Negócio excluído com sucesso" });
    } else {
      res.status(404).json({ error: "Negocio não encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNegocios,
  createNegocio,
  updateNegocio,
  deleteNegocio,
  updateNegocioParaEtapa,
};
