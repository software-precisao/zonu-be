const path = require('path');
const fs = require("fs").promises;
const config = require("../helpers/email-config")
const nodemailer = require("nodemailer");
require('dotenv').config();


const enviarBoasVindas = async (req, res) => {
    const { email, nome } = req.body;
    try {
        const htmlFilePath = path.join(__dirname, '../template/boasvindas/index.html');
        let htmlContent = await fs.readFile(htmlFilePath, "utf8");

        htmlContent = htmlContent
            .replace("{{nome}}", nome)

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                ciphers: "TLSv1",
            },
        });

        let mailOptions = {
            from: `"Atendimento Zonu" ${process.env.EMAIL_FROM}`,
            to: email,
            subject: "✅ Conta criada com sucesso!",
            html: htmlContent,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Mensagem enviada: %s", info.messageId);
        res.send("Email enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar email: ", error);
        res.send("Erro ao enviar email.");
    }
};

const enviarAvisoAdmin = async (req, res) => {
    const { email, nome } = req.body;
    try {
        const htmlFilePath = path.join(__dirname, '../template/aviso/admin.html');
        let htmlContent = await fs.readFile(htmlFilePath, "utf8");

        htmlContent = htmlContent
            .replace("{{nome}}", nome)
            .replace("{{email}}", email)

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                ciphers: "TLSv1",
            },
        });

        let emailAdmin = 'cadastro@zonu.com.br'

        let mailOptions = {
            from: `"Equipe Zonu" ${process.env.EMAIL_FROM}`,
            to: emailAdmin,
            subject: "✅ Temos um novo usuário na plataforma!",
            html: htmlContent,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Mensagem enviada: %s", info.messageId);
        res.send("Email enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar email: ", error);
        res.send("Erro ao enviar email.");
    }
};

const enviarSenha = async (req, res) => {
    const { email, nome } = req.body;
    try {
        const htmlFilePath = path.join(__dirname, '../template/auth/senha.html');
        let htmlContent = await fs.readFile(htmlFilePath, "utf8");

        htmlContent = htmlContent
            .replace("{{nome}}", nome)

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                ciphers: "TLSv1",
            },
        });

        let mailOptions = {
            from: `"Alteração de senha" ${process.env.EMAIL_FROM}`,
            to: email,
            subject: "🔒 Senha trocada com sucesso!",
            html: htmlContent,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Mensagem enviada: %s", info.messageId);
        res.send("Email enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar email: ", error);
        res.send("Erro ao enviar email.");
    }
};

const enviarEmailAcesso = async (req, res) => {
    const { email, nome, localizacao, data, hora, enderecoIp } = req.body;
    try {
        const htmlFilePath = path.join(__dirname, '../template/acesso/index.html');
        let htmlContent = await fs.readFile(htmlFilePath, "utf8");

        htmlContent = htmlContent
            .replace("{{nome}}", nome)
            .replace("{{localizacao}}", localizacao)
            .replace("{{data}}", data)
            .replace("{{hora}}", hora)
            .replace("{{enderecoIp}}", enderecoIp);

            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
                tls: {
                    ciphers: "TLSv1",
                },
            });

        let mailOptions = {
            from: `"Segurança Zonu" ${process.env.EMAIL_FROM}`,
            to: email,
            subject: "🚨 Detectamos um novo acesso...",
            html: htmlContent,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Mensagem enviada: %s", info.messageId);
        res.send("Email enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar email: ", error);
        res.send("Erro ao enviar email.");
    }
};

const enviarNovoImovel = async (req, res) => {
    const { email, nome } = req.body;
    try {
        const htmlFilePath = path.join(__dirname, '../template/imovel/index.html');
        let htmlContent = await fs.readFile(htmlFilePath, "utf8");

        htmlContent = htmlContent
            .replace("{{nome}}", nome)

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                ciphers: "TLSv1",
            },
        });

        let mailOptions = {
            from: `"Atendimento Zonu" ${process.env.EMAIL_FROM}`,
            to: email,
            subject: "🏠 Temos um novo imóvel!",
            html: htmlContent,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Mensagem enviada: %s", info.messageId);
        res.send("Email enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar email: ", error);
        res.send("Erro ao enviar email.");
    }
};


module.exports = {
    enviarBoasVindas,
    enviarAvisoAdmin,
    enviarNovoImovel,
    enviarEmailAcesso,
    enviarSenha
};