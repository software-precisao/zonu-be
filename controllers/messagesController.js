const Mensagens = require("../models/tb_mensagens");

const enviarMensagem = async (req, res) => {
    try {
        const { mensagem, tempo } = req.body;
        const novaMensagem = await Mensagens.create({ mensagem, tempo });
        res.status(201).json(novaMensagem);
    } catch (error) {
        res.status(500).json({ error: "Erro ao enviar a mensagem" });
    }
};

const pegarTodasMensagens = async (req, res) => {
    try {
        const mensagens = await Mensagens.findAll();
        res.status(200).json(mensagens);
    } catch (error) {
        res.status(500).json({ error: "Erro ao pegar todas as mensagens" });
    }
};

const pegarMensagemPorId = async (req, res) => {
    try {
        const { id_mensagem } = req.params;
        const mensagem = await Mensagens.findByPk(id_mensagem);
        if (mensagem) {
            res.status(200).json(mensagem);
        } else {
            res.status(404).json({ error: "Mensagem não encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro ao pegar a mensagem" });
    }
};

module.exports = {
    enviarMensagem,
    pegarTodasMensagens,
    pegarMensagemPorId
};
