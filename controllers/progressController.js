const Progressao = require("../models/tb_progressao");

const progressaoController = {
  // Criar uma nova progressão
  criarProgressao: async (req, res) => {
    try {
      const { perfil, logo_capa, imovel, publicacao, id_user } = req.body;
      const novaProgressao = await Progressao.create({
        perfil,
        logo_capa,
        imovel,
        publicacao,
        id_user,
      });
      res.status(201).send(novaProgressao);
    } catch (error) {
      console.error("Erro ao criar progressão:", error);
      res
        .status(500)
        .send({ mensagem: "Erro ao criar progressão", error: error.message });
    }
  },

  // Obter todas as progressões
  buscarTodasProgressoes: async (req, res) => {
    try {
      const progressoes = await Progressao.findAll();
      res.status(200).send(progressoes);
    } catch (error) {
      console.error("Erro ao buscar progressões:", error);
      res
        .status(500)
        .send({ mensagem: "Erro ao buscar progressões", error: error.message });
    }
  },

  // Obter uma progressão pelo ID
  buscarProgressaoPorId: async (req, res) => {
    try {
      const progressao = await Progressao.findOne({
        where: {
          id_user: req.params.id_user,
        },
      });
      if (progressao) {
        res.status(200).send(progressao);
      } else {
        res.status(404).send({ mensagem: "Progressão não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao buscar progressão:", error);
      res
        .status(500)
        .send({ mensagem: "Erro ao buscar progressão", error: error.message });
    }
  },

  // Atualizar uma progressão
  atualizarProgressao: async (req, res) => {
    try {
      const progresso = await Progressao.findByPk(req.body.id_user);
      if (!progresso) {
        return res.status(404).send({ message: "Progresso não encontrado" });
      }

      await progresso.update(req.body);

      return res
        .status(201)
        .send({ mensagem: "Dados do progresso alterados com sucesso!" });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  // Deletar uma progressão
  deletarProgressao: async (req, res) => {
    try {
      const resultado = await Progressao.destroy({
        where: { id_progressao: req.params.id },
      });
      if (resultado) {
        res.send({ mensagem: "Progressão deletada com sucesso!" });
      } else {
        res
          .status(404)
          .send({ mensagem: "Progressão não encontrada para deletar" });
      }
    } catch (error) {
      console.error("Erro ao deletar progressão:", error);
      res
        .status(500)
        .send({ mensagem: "Erro ao deletar progressão", error: error.message });
    }
  },
};

module.exports = progressaoController;
