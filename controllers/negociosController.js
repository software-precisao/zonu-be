const Negocio = require("../models/tb_negocio");
const Cliente = require("../models/tb_clientes");
const Posicao = require("../models/tb_posicao");
const NivelInteresse = require("../models/tb_niveis_interesse");
const NovoImovel = require("../models/tb_imovel");

const getNegocios = async (req, res) => {
  try {
    const negocios = await Negocio.findAll({
      attributes: {
        exclude: [
          "id_posicao",
          "id_nivel_interesse",
          "id_cliente",
          "id_imovel",
        ],
      },
      include: [
        {
          model: Posicao,
          as: "Posicao",
          attributes: ["tipo_posicao"],
        },
        {
          model: NivelInteresse,
          as: "NivelInteresse",
          attributes: ["nivel_interesse"],
        },
        {
          model: Cliente,
          as: "Cliente",
          attributes: ["nome"],
        },
        {
          model: NovoImovel,
          as: "NovoImovel",
          attributes: ["id_imovel"],
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
    const { id_posicao, id_nivel_interesse, id_cliente, id_imovel } = req.body;

    if ((!id_posicao, !id_nivel_interesse || !id_cliente || !id_imovel)) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const novoNegocio = await Negocio.create({
      id_posicao,
      id_nivel_interesse,
      id_cliente,
      id_imovel,
    });
    return res.status(201).json(novoNegocio);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateNegocio = async (req, res) => {
  try {
    const { id_negocio } = req.params;
    const { id_posicao, id_nivel_interesse, id_cliente, id_imovel } = req.body;

    const negocio = await Negocio.findByPk(id_negocio);
    if (!negocio) {
      return res.status(404).json({ message: "Negócio não encontrado" });
    }
    negocio.id_posicao = id_posicao || negocio.id_posicao;
    negocio.id_nivel_interesse =
      id_nivel_interesse || negocio.id_nivel_interesse;
    negocio.id_cliente = id_cliente || negocio.id_cliente;
    negocio.id_imovel = id_imovel || negocio.id_imovel;

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
};
