const Vendas = require("../models/tb_vendas");
const Funil = require("../models/tb_funil");
const Etapa = require("../models/tb_etapa");
const Usuario = require("../models/tb_usuarios");

const obterVendas = async (req, res, next) => {
  try {
    const vendas = await Vendas.findAll({
      include: [
        {
          model: Etapa,
          as: "etapa",
          include: [
            {
              model: Funil, 
              as: "funil", 
            },
          ],
        },
        {
          model: Usuario, 
          as: "usuario", 
        },
      ],
    });
    return res.status(200).send({ response: vendas });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterVendaPorId = async (req, res, next) => {
  try {
    const venda = await Vendas.findByPk(req.params.id_venda, {
      include: [
        {
          model: Etapa,
          as: "etapa",
          include: [
            {
              model: Funil, 
              as: "funil", 
            },
          ],
        },
        {
          model: Usuario, 
          as: "usuario", 
        },
      ],
    });
    if (venda) {
      return res.status(200).send({ response: venda });
    } else {
      return res.status(404).send({ message: "Venda não encontrada" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarVenda = async (req, res, next) => {
  try {
    const { id_etapa, id_user } = req.body; 

    const etapa = await Etapa.findByPk(id_etapa);
    if (!etapa) {
      return res.status(404).send({ message: "Etapa não encontrada" });
    }

    const usuario = await Usuario.findByPk(id_user); 
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const novaVenda = await Vendas.create({ id_etapa, id_user });
    return res.status(201).send({ response: novaVenda });
  } catch (error) {
    console.error("Erro ao criar venda: ", error);
    return res.status(500).send({ error: error.message });
  }
};

const atualizarVenda = async (req, res, next) => {
  try {
    const { id_etapa, id_user } = req.body; 

    const etapa = await Etapa.findByPk(id_etapa);
    if (!etapa) {
      return res.status(404).send({ message: "Etapa não encontrada" });
    }

    const usuario = await Usuario.findByPk(id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const vendaAtualizada = await Vendas.update(
      { id_etapa, id_user },
      { where: { id_venda: req.params.id_venda } }
    );

    if (vendaAtualizada[0]) {
      return res.status(200).send({ message: "Venda atualizada com sucesso" });
    } else {
      return res.status(404).send({ message: "Venda não encontrada" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarVenda = async (req, res, next) => {
  try {
    const deletado = await Vendas.destroy({
      where: { id_venda: req.params.id_venda },
    });
    if (deletado) {
      return res.status(200).send({ message: "Venda deletada com sucesso" });
    } else {
      return res.status(404).send({ message: "Venda não encontrada" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  atualizarVenda,
  criarVenda,
  deletarVenda,
  obterVendaPorId,
  obterVendas,
};
