const Funil = require("../models/tb_funil");

const criarFunil = async (req, res) => {
  try {
    const { nome_funil, dias_limpeza, descricao } = req.body;
    const novoFunil = await Funil.create({ nome_funil, dias_limpeza, descricao });
    res.status(201).json(novoFunil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obterTodosFunis = async (req, res) => {
  try {
    const funis = await Funil.findAll();
    res.status(200).json(funis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obterFunilPorId = async (req, res) => {
  try {
    const { id_funil } = req.params.id_funil;
    const funil = await Funil.findByPk(id_funil);
    if (funil) {
      res.status(200).json(funil);
    } else {
      res.status(404).json({ error: "Funil não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarFunil = async (req, res) => {
  try {
    const { id_funil } = req.params.id_funil;
    const { nome_funil, dias_limpeza, descricao } = req.body;
    const [atualizado] = await Funil.update({ nome_funil, dias_limpeza, descricao }, { where: { id_funil: id } });

    if (atualizado) {
      const funilAtualizado = await Funil.findByPk(id_funil);
      res.status(200).json(funilAtualizado);
    } else {
      res.status(404).json({ error: "Funil não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const excluirFunil = async (req, res) => {
  try {
    const { id_funil } = req.params.id_funil;
    const deletado = await Funil.destroy({ where: { id_funil: id_funil } });

    if (deletado) {
      return res.status(200).json({ message: "Funil deletado com sucesso" });
    } else {
      res.status(404).json({ error: "Funil não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  criarFunil,
  obterTodosFunis,
  obterFunilPorId,
  atualizarFunil,
  excluirFunil,
};
