const Funil = require("../models/tb_funil");
const Etapa = require("../models/tb_etapa");
const Usuario = require("../models/tb_usuarios");

const criarFunil = async (req, res) => {
  try {
    const { nome_funil, dias_limpeza, descricao, etapas, id_user } = req.body;

    if (!Array.isArray(etapas)) {
      return res.status(400).json({ error: "Etapas deve ser um array" });
    }

    const novoFunil = await Funil.create({
      nome_funil,
      dias_limpeza,
      descricao,
      id_user,
    });

    const etapasCriadas = [];
    if (etapas.length > 0) {
      for (const etapa of etapas) {
        const etapaCriada = await Etapa.create({
          nome_etapa: etapa.nome_etapa,
          dias_limpeza: etapa.dias_limpeza,
          descricao: etapa.descricao,
          id_funil: novoFunil.id_funil,
        });
        etapasCriadas.push(etapaCriada);
      }
    }

    return res.status(201).json({
      message: "Funil e etapas criados com sucesso",
      funil: novoFunil,
      etapas: etapasCriadas,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const obterTodosFunis = async (req, res) => {
  try {
    const funis = await Funil.findAll({
      include: [
        { model: Etapa, as: "etapas" },
        { model: Usuario, as: "Usuario" },
      ],
    });
    res.status(200).json(funis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obterFunilPorId = async (req, res) => {
  try {
    const { id_funil } = req.params;
    const funil = await Funil.findByPk(id_funil, {
      include: [{ model: Etapa, as: "etapas" }],
    });
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
    const { id_funil } = req.params;
    const { nome_funil, dias_limpeza, descricao, etapas, id_user } = req.body;

    const [atualizado] = await Funil.update(
      { nome_funil, dias_limpeza, descricao, id_user },
      { where: { id_funil } }
    );

    if (atualizado) {
      if (Array.isArray(etapas)) {
        await Etapa.destroy({ where: { id_funil } });

        for (const etapa of etapas) {
          await Etapa.create({
            nome_etapa: etapa.nome_etapa,
            dias_limpeza: etapa.dias_limpeza,
            descricao: etapa.descricao,
            id_funil: id_funil,
          });
        }
      }

      const funilAtualizado = await Funil.findByPk(id_funil, {
        include: [{ model: Etapa, as: "etapas" }],
      });

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
    const { id_funil } = req.params;

    await Etapa.destroy({ where: { id_funil } });

    const deletado = await Funil.destroy({ where: { id_funil } });

    if (deletado) {
      res.status(200).json({ message: "Funil e etapas deletados com sucesso" });
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
