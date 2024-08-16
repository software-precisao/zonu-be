const PessoasLigadas = require("../models/tb_pessoas_ligadas");
const Cliente = require("../models/tb_clientes");

const getPessoasLigadas = async (req, res) => {
  try {
    const pessoasLigadas = await PessoasLigadas.findAll({
      include: [
        {
          model: Cliente,
          as: "Cliente",
          attributes: ['nome'] 
        },
      ],
    });
    return res.status(200).json(pessoasLigadas);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createPessoaLigada = async (req, res) => {
  try {
    const { id_cliente, breve_descricao } = req.body;

    if (id_cliente) {
      const cliente = await Cliente.findByPk(id_cliente);
      if (!cliente) {
        return res.status(400).json({ error: "Cliente não encontrado" });
      }
    }

    const novaPessoaLigada = await PessoasLigadas.create({
      id_cliente,
      breve_descricao,
    });
    return res.status(201).json(novaPessoaLigada);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updatePessoaLigada = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_cliente, breve_descricao } = req.body;

    const pessoaLigada = await PessoasLigadas.findByPk(id);
    if (!pessoaLigada) {
      return res.status(404).json({ message: "Pessoa ligada não encontrada" });
    }

    if (id_cliente) {
      const cliente = await Cliente.findByPk(id_cliente);
      if (!cliente) {
        return res.status(400).json({ error: "Cliente não encontrado" });
      }
    }

    await pessoaLigada.update({
      id_cliente,
      breve_descricao,
    });

    return res.status(200).json(pessoaLigada);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deletePessoaLigada = async (req, res) => {
  try {
    const { id } = req.params;
    const pessoaLigada = await PessoasLigadas.findByPk(id);
    if (!pessoaLigada) {
      return res.status(404).json({ message: "Pessoa ligada não encontrada" });
    }

    await pessoaLigada.destroy();
    return res.status(200).json({ message: "Pessoa ligada excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPessoasLigadas,
  createPessoaLigada,
  updatePessoaLigada,
  deletePessoaLigada,
};
