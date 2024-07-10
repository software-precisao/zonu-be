const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");

const Code = require("../models/tb_code");
const Token = require("../models/tb_token");
const User = require("../models/tb_usuarios");
const Perfil = require("../models/tb_perfil");
const Progress = require("../models/tb_progressao");
const Qrcode = require("../models/tb_qrcode");
const Imovel = require("../models/tb_imovel");
const Condominio = require("../models/tb_condominio");

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs").promises;
require("dotenv").config();

const geoip = require("geoip-lite");
const moment = require("moment");

const cadastrarUsuario = async (req, res, next) => {
  try {
    const perfilExistente = await Perfil.findOne({
      where: { cnpj: req.body.cnpj },
    });
    if (perfilExistente) {
      return res.status(409).send({
        mensagem: "Cnpj já cadastrado, por favor insira um CNPJ diferente!",
      });
    }

    const usuarioExistente = await User.findOne({
      where: { email: req.body.email },
    });
    if (usuarioExistente) {
      return res.status(409).send({
        mensagem: "Email já cadastrado, por favor insira um email diferente!",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.senha, 10);
    const filename = req.file ? req.file.filename : "default-avatar.png";
    const filenameLogo = req.file ? req.file.filename : "default-logo.png";
    const filenameCapa = req.file ? req.file.filename : "default-capa.png";

    const novoUsuario = await User.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: hashedPassword,
      avatar: `/avatar/${filename}`,
      id_plano: req.body.id_plano,
      id_status: 2,
      id_nivel: 3,
    });

    const novoperfil = await Perfil.create({
      razao_social: req.body.razao_social,
      cnpj: req.body.cnpj,
      telefone: req.body.telefone,
      cep: req.body.cep,
      avatar: `/logo/${filenameLogo}`,
      capa: `/capa/${filenameCapa}`,
      endereco: req.body.endereco,
      termos: "S",
      numero: req.body.numero,
      complemento: req.body.complemento,
      cidade: req.body.cidade,
      estado: req.body.estado,
      bairro: req.body.bairro,
      id_user: novoUsuario.id_user,
    });

    const codigoAleatorio = Math.floor(1000 + Math.random() * 9000).toString();

    const code = await Code.create({
      type_code: 1,
      code: codigoAleatorio,
      id_user: novoUsuario.id_user,
    });

    const tokenUsuario = await Token.create({
      id_user: novoUsuario.id_user,
      token: uuidv4(),
    });

    const progressStatus = await Progress.create({
      perfil: 1,
      logo_capa: 0,
      imovel: 0,
      publicacao: 0,
      id_user: novoUsuario.id_user,
    });

    const qrData = "https://zonu.com.br/";
    const qrCodeURL = await QRCode.toDataURL(qrData);

    const novoQrcode = await Qrcode.create({
      qrcode: qrCodeURL,
      tipo: 2,
      id_user: novoUsuario.id_user,
    });

    const htmlFilePath = path.join(__dirname, "../template/aviso/cliente.html");
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    htmlContent = htmlContent
      .replace("{{nome}}", novoUsuario.nome)
      .replace("{{email}}", novoUsuario.email);

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

    let email = novoUsuario.email;

    let mailOptions = {
      from: `"Atendimento Zonu" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: "✅ Conta criada com sucesso!",
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada: %s", info.messageId);

    const response = {
      mensagem: "Usuário cadastrado com sucesso",
      usuarioCriado: {
        id_user: novoUsuario.id_user,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        nivel: novoUsuario.id_nivel,
        id_perfil: novoperfil.id_perfil,
        razao_social: novoperfil.razao_social,
        cnpj: novoperfil.cnpj,
        token_unico: tokenUsuario.token,
        code: code.code,
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const cadastrarUsuarioSimple = async (req, res, next) => {
  try {
    const filename = req.file ? req.file.filename : "default-avatar.png";
    const usuarioExistente = await User.findOne({
      where: { email: req.body.email },
    });
    if (usuarioExistente) {
      return res.status(409).send({
        mensagem: "Email já cadastrado, por favor insira um email diferente!",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.senha, 10);

    const novoUsuario = await User.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: hashedPassword,
      avatar: `/avatar/${filename}`,
      id_plano: req.body.id_plano,
      id_status: 1,
      id_nivel: 1,
    });

    const codigoAleatorio = Math.floor(1000 + Math.random() * 9000).toString();

    const code = await Code.create({
      type_code: 1,
      code: codigoAleatorio,
      id_user: novoUsuario.id_user,
    });

    const tokenUsuario = await Token.create({
      id_user: novoUsuario.id_user,
      token: uuidv4(),
    });

    const qrData = "https://zonu.com.br/";
    const qrCodeURL = await QRCode.toDataURL(qrData);

    const novoQrcode = await Qrcode.create({
      qrcode: qrCodeURL,
      tipo: 2,
      id_user: novoUsuario.id_user,
    });

    const progressStatus = await Progress.create({
      perfil: 1,
      logo_capa: 1,
      imovel: 1,
      publicacao: 1,
      id_user: novoUsuario.id_user,
    });

    const userIp = req.ip;

    const geo = geoip.lookup(userIp);
    const location = geo
      ? `${geo.city}, ${geo.region}, ${geo.country}`
      : "Localização desconhecida";

    const currentDate = moment().format("DD/MM/YYYY");
    const currentTime = moment().format("HH:mm:ss");

    const htmlFilePath = path.join(
      __dirname,
      "../template/boasvindas/administrador.html"
    );
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    htmlContent = htmlContent
      .replace("{{nome}}", novoUsuario.nome)
      .replace("{{email}}", novoUsuario.email)
      .replace("{{localizacao}}", location)
      .replace("{{enderecoIp}}", userIp)
      .replace("{{data}}", currentDate)
      .replace("{{hora}}", currentTime);

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

    let email = novoUsuario.email;

    let mailOptions = {
      from: `"Atendimento Zonu" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: "✅ Bem-vindo Chefe!",
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada: %s", info.messageId);

    const response = {
      mensagem: "Usuário cadastrado com sucesso",
      usuarioCriado: {
        id_user: novoUsuario.id_user,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        nivel: novoUsuario.id_nivel,
        token_unico: tokenUsuario.token,
        code: code.code,
        request: {
          tipo: "GET",
          descricao: "Pesquisar um usuário",
          url: `https://trustchecker.com.br/api/usuarios/${novoUsuario.id_user}`,
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cadastrarEquipeZonu = async (req, res, next) => {
  try {
    const filename = req.file ? req.file.filename : "default-avatar.png";
    const usuarioExistente = await User.findOne({
      where: { email: req.body.email },
    });
    if (usuarioExistente) {
      return res.status(409).send({
        mensagem: "Email já cadastrado, por favor insira um email diferente!",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.senha, 10);

    const novoUsuario = await User.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: hashedPassword,
      avatar: `/avatar/${filename}`,
      id_status: req.body.status,
      id_nivel: req.body.nivel,
      id_plano: req.body.id_plano,
    });

    const codigoAleatorio = Math.floor(1000 + Math.random() * 9000).toString();

    const code = await Code.create({
      type_code: 1,
      code: codigoAleatorio,
      id_user: novoUsuario.id_user,
    });

    const tokenUsuario = await Token.create({
      id_user: novoUsuario.id_user,
      token: uuidv4(),
    });

    const qrData = "https://zonu.com.br/";
    const qrCodeURL = await QRCode.toDataURL(qrData);

    const novoQrcode = await Qrcode.create({
      qrcode: qrCodeURL,
      tipo: 2,
      id_user: novoUsuario.id_user,
    });

    const progressStatus = await Progress.create({
      perfil: 1,
      logo_capa: 1,
      imovel: 1,
      publicacao: 1,
      id_user: novoUsuario.id_user,
    });

    const userIp = req.ip;

    const geo = geoip.lookup(userIp);
    const location = geo
      ? `${geo.city}, ${geo.region}, ${geo.country}`
      : "Localização desconhecida";

    const currentDate = moment().format("DD/MM/YYYY");
    const currentTime = moment().format("HH:mm:ss");

    if (novoUsuario.id_nivel == 2) {
      const htmlFilePath = path.join(
        __dirname,
        "../template/boasvindas/suporte.html"
      );
      let htmlContent = await fs.readFile(htmlFilePath, "utf8");

      htmlContent = htmlContent
        .replace("{{nome}}", novoUsuario.nome)
        .replace("{{email}}", novoUsuario.email)
        .replace("{{localizacao}}", location)
        .replace("{{enderecoIp}}", userIp)
        .replace("{{data}}", currentDate)
        .replace("{{hora}}", currentTime);

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

      let email = novoUsuario.email;

      let mailOptions = {
        from: `"Atendimento Zonu" ${process.env.EMAIL_FROM}`,
        to: email,
        subject: "🚀 Bem-vindo ao Time!",
        html: htmlContent,
      };

      let info = await transporter.sendMail(mailOptions);
      console.log("Mensagem enviada ao suporte", info.messageId);
    }

    const response = {
      mensagem: "Usuário cadastrado com sucesso",
      usuarioCriado: {
        id_user: novoUsuario.id_user,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        nivel: novoUsuario.id_nivel,
        token_unico: tokenUsuario.token,
        code: code.code,
        request: {
          tipo: "GET",
          descricao: "Pesquisar um usuário",
          url: `https://trustchecker.com.br/api/usuarios/${novoUsuario.id_user}`,
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterUsuarios = async (req, res, next) => {
  try {
    const usuarios = await User.findAll({
      include: [
        { model: Code, as: "code" },
        { model: Token, as: "token" },
        { model: Perfil, as: "perfil" },
        { model: Progress, as: "progress" },
        { model: Qrcode, as: "qrcode" },
      ],
    });
    return res.status(200).send({ response: usuarios });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterUsuarioPorId = async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.params.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    return res.status(200).send({ response: usuario });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterUsuarioPorEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const usuario = await User.findOne({ where: { email: email } });
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const codigoAleatorio = Math.floor(1000 + Math.random() * 9000).toString();

    const code = await Code.create({
      type_code: 2,
      code: codigoAleatorio,
      id_user: usuario.id_user,
    });

    const htmlFilePath = path.join(__dirname, "../template/auth/code.html");
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    htmlContent = htmlContent
      .replace("{{email}}", usuario.email)
      .replace("{{code}}", code.code);

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
      from: `"Equipe Zonu" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: "🔒 Código de confirmação",
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada: %s", info.messageId);

    return res.status(200).send({ response: { id_user: usuario.id_user } });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const validaCode = async (req, res, next) => {
  try {
    const { code } = req.body;

    // Verifica se o código foi fornecido
    if (!code) {
      return res.status(400).send({ message: "Código não fornecido" });
    }

    // Busca o código na tabela
    const codes = await Code.findOne({ where: { code: code } });

    // Verifica se o código foi encontrado
    if (!codes) {
      return res.status(404).send({ message: "Código não encontrado" });
    }

    // Retorna o ID do usuário associado ao código
    return res.status(200).send({ response: { id_user: codes.id_user } });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const atualizarUsuario = async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.body.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    usuario.nome = req.body.nome;
    usuario.sobrenome = req.body.sobrenome;
    usuario.email = req.body.email;
    usuario.id_nivel = req.body.nivel;
    usuario.id_status = req.body.status;
    await usuario.save();
    return res
      .status(201)
      .send({ mensagem: "Dados de usuário alterados com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const atualizarStatusUsuario = async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.body.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    usuario.id_status = req.body.status;

    await usuario.save();
    return res
      .status(201)
      .send({ mensagem: "Dados de usuário alterados com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const atualizarDadosUsuario = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const usuario = await User.findByPk(req.body.id_user, { transaction: t });
    const perfil = await Perfil.findByPk(req.body.id_user, { transaction: t });

    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    if (!perfil) {
      return res.status(404).send({ message: "Perfil não encontrado" });
    }

    usuario.nome = req.body.nome;
    usuario.sobrenome = req.body.sobrenome;
    usuario.email = req.body.email;

    perfil.razao_social = req.body.razao_social;
    perfil.cnpj = req.body.cnpj;
    perfil.telefone = req.body.telefone;
    perfil.cep = req.body.cep;
    perfil.endereco = req.body.endereco;
    perfil.numero = req.body.numero;
    perfil.complemento = req.body.complemento;
    perfil.cidade = req.body.cidade;
    perfil.estado = req.body.estado;
    perfil.bairro = req.body.bairro;

    await usuario.save({ transaction: t });
    await perfil.save({ transaction: t });

    await t.commit();

    return res
      .status(200)
      .send({ mensagem: "Dados de usuário alterados com sucesso!" });
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const trocaSenha = async (req, res, next) => {
  try {
    const userId = req.params.id_user;

    // Verifica se o ID do usuário é válido
    if (!userId) {
      return res.status(400).send({ message: "ID do usuário não fornecido" });
    }

    const usuario = await User.findByPk(userId);

    // Verifica se o usuário foi encontrado
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    // Atualiza a senha do usuário
    const hashedPassword = await bcrypt.hash(req.body.senha, 10);
    usuario.senha = hashedPassword;

    // Salva as alterações no usuário
    await usuario.save();

    return res.status(200).send({ mensagem: "Senha alterada com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const trocaSenhaporEmail = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email não fornecido" });
    }

    const usuario = await User.findOne({ where: { email: email } });

    // Verifica se o usuário foi encontrado
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    // Atualiza a senha do usuário
    const hashedPassword = await bcrypt.hash(senha, 10);
    usuario.senha = hashedPassword;

    const htmlFilePath = path.join(__dirname, "../template/auth/senha.html");
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    htmlContent = htmlContent.replace("{{email}}", usuario.email);

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
      from: `"Equipe Zonu" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: "🔒 Senha alterada com sucesso!",
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada: %s", info.messageId);

    // Salva as alterações no usuário
    await usuario.save();

    return res.status(200).send({ mensagem: "Senha alterada com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const excluirUsuario = async (req, res, next) => {
  try {
    const id_user = req.params.id_user;

    await Qrcode.destroy({ where: { id_user } });
    await Token.destroy({ where: { id_user } });
    await Code.destroy({ where: { id_user } });
    await Perfil.destroy({ where: { id_user } });
    await Progress.destroy({ where: { id_user } });
    await Imovel.destroy({ where: { id_user } });
    await Condominio.destroy({ where: { id_user } });

    // Depois, tenta deletar o usuário
    const usuario = await User.findByPk(id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    await usuario.destroy();

    return res.status(202).send({ mensagem: "Usuário excluído com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterUsuarios,
  obterUsuarioPorId,
  validaCode,
  obterUsuarioPorEmail,
  trocaSenhaporEmail,
  atualizarUsuario,
  excluirUsuario,
  cadastrarUsuario,
  cadastrarUsuarioSimple,
  cadastrarEquipeZonu,
  trocaSenha,
  atualizarStatusUsuario,
  atualizarDadosUsuario,
};
