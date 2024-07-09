const Ticket = require("../models/tb_ticket");
const User = require("../models/tb_usuarios");
const crypto = require("crypto");

const ticketController = {
  // Criar um novo ticket
  criarTicket: async (req, res) => {
    try {
      const { assunto, mensagem, id_user } = req.body;
      const data_pergunta = new Date(); // Data e hora atual
      const status = 2; // Status definido como 2 por padrão, ajuste conforme necessário

      // Gerar um número de protocolo único
      const protocolo = `${Date.now()}-${crypto
        .randomBytes(2)
        .toString("hex")}`;

      const novoTicket = await Ticket.create({
        protocolo,
        assunto,
        mensagem,
        data_pergunta,
        status,
        id_user,
      });

      return res.status(201).send({ response: novoTicket });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  // Obter todos os tickets
  listarTickets: async (req, res) => {
    try {
      const tickets = await Ticket.findAll({
        include: [
          {
            model: User,
            as: "usuario",
            attributes: ["id_user", "nome", "sobrenome", "email", "avatar"],
          },
        ],
      });

      return res.status(200).send(tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return res.status(500).send({ error: error.message });
    }
  },
  listarUserTickets: async (req, res) => {
    try {
      const { id_user } = req.params;
      const tickets = await Ticket.findAll({
        where: { id_user },
        include: [
          {
            model: User,
            as: "usuario",
            attributes: ["id_user", "nome", "sobrenome", "email", "avatar"],
          },
        ],
      });

      return res.status(200).send(tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return res.status(500).send({ error: error.message });
    }
  },

  // Obter um ticket específico pelo ID
  obterTicket: async (req, res) => {
    try {
      const { id_user } = req.params;
      const tickets = await Ticket.findAll({
        where: { id_user },
      });
      if (!tickets || tickets.length === 0) {
        return res
          .status(404)
          .send({ message: "Nenhum ticket encontrado para este usuário." });
      }
      return res.status(200).send(tickets);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  // Atualizar um ticket
  respostaTicket: async (req, res) => {
    try {
      const { id_ticket } = req.params;
      const { resposta } = req.body;
  
      const ticket = await Ticket.findByPk(id_ticket);
      if (!ticket) {
        return res.status(404).send({ message: "Ticket não encontrado" });
      }
  
      // Configura a data de resposta para agora
      const data_resposta = new Date();
  
      // Assume que data_pergunta é um objeto Date válido
      // Se for uma string, você precisa convertê-la para um objeto Date primeiro
      const tempo_resposta = (data_resposta - new Date(ticket.data_pergunta)) / 1000; // diferença em segundos
  
      // Atualiza o ticket
      ticket.resposta = resposta;
      ticket.data_resposta = data_resposta;
      ticket.status = 1; // Supondo que '1' seja o status para 'respondido'
      ticket.tempo_resposta = tempo_resposta; // tempo em segundos
  
      await ticket.save();
      return res.status(200).send({ message: "Ticket atualizado com sucesso" });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  

  // Excluir um ticket
  excluirTicket: async (req, res) => {
    try {
      const { id_ticket } = req.params;
      const ticket = await Ticket.findByPk(id_ticket);
      if (!ticket) {
        return res.status(404).send({ message: "Ticket não encontrado" });
      }
      await ticket.destroy();
      return res.status(200).send({ message: "Ticket excluído com sucesso" });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};

module.exports = ticketController;
