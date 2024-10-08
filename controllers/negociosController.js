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
const Info = require("../models/tb_info_imovel");
const PessoasLigadas = require("../models/tb_pessoas_ligadas");
const AnotacoesCRM = require("../models/tb_anotacao_crm")
const Funil = require("../models/tb_funil")

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
          include: [
            {
              model: Funil,
              as: "funil",
            },
          ]
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
            },
            {
              model: Comodos,
              as: "comodos",
            },
            {
              model: Medidas,
              as: "medidas",
            },
            {
              model: Preco,
              as: "preco",
            },
            {
              model: Localizacao,
              as: "localizacao",
            },
            {
              model: Descricao,
              as: "descricao",
            },
            {
              model: Complemento,
              as: "complemento",
            },
            {
              model: ImagemImovel,
              as: "fotos",
            },
            {
              model: Info,
              as: "info",
            },
          ],
        },
        {
          model: Usuario,
          as: "Usuario",
        },
      ],
      
    });

    const negociosResponse = [];

    for (let i = 0; i < negocios.length; i++) {
      const negocio = { ...negocios[i].dataValues };
      const { Cliente } = negocio;
    
      if (!Cliente) {
        negociosResponse.push(negocio);
        continue;
      }
    
      const anotacoesCRM = await AnotacoesCRM.findAll({
        where: { id_negocio: negocio.id_negocio },
      });
    
      const pessoasLigadas = await PessoasLigadas.findAll({
        where: {
          id_cliente: Cliente.id_cliente,
        },
      });
    
      negociosResponse.push({
        ...negocio,
        Cliente: {
          ...Cliente.dataValues,
          AnotacoesCRM: anotacoesCRM.map((anotacao) => anotacao.dataValues),
          pessoasLigadas: pessoasLigadas.map((pessoa) => pessoa.dataValues),
        },
      });
    }
    

    return res.status(200).json(negociosResponse);
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

const updateStatusNegocio = async (req, res) => {
  try {
    const { id_negocio } = req.params;
    const { status_negocio } = req.body;

    const allowedStatuses = ["Ganho", "Perdido"];
    if (!allowedStatuses.includes(status_negocio)) {
      return res.status(400).json({ message: "Status inválido. Use 'Ganho' ou 'Perdido'." });
    }

    const negocio = await Negocio.findByPk(id_negocio);
    if (!negocio) {
      return res.status(404).json({ message: "Negócio não encontrado" });
    }

    negocio.status_negocio = status_negocio;
    await negocio.save();

    return res.status(200).json({ message: "Status do negócio atualizado com sucesso", negocio });
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
  updateStatusNegocio
};
