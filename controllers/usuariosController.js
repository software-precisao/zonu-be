const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");
const { format } = require("date-fns");

const Code = require("../models/tb_code");
const Token = require("../models/tb_token");
const User = require("../models/tb_usuarios");
const Perfil = require("../models/tb_perfil");
const PerfilUser = require("../models/tb_perfil_user_imobiliaria");
const Progress = require("../models/tb_progressao");
const Qrcode = require("../models/tb_qrcode");
const Imovel = require("../models/tb_imovel");
const Condominio = require("../models/tb_condominio");
const ControleTeste = require("../models/tb_controle_teste");
const Usuario = require("../models/tb_usuarios");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs").promises;
require("dotenv").config();

const axios = require("axios");

const TokenPayment = require("../models/tb_token_payment");

const geoip = require("geoip-lite");
const moment = require("moment");
const sequelize = require("../data/conn");
const Controle = require("../models/tb_controle_teste");
const LinkTemporario = require("../models/tb_links_temporarios");
const PerfilUserImobiliaria = require("../models/tb_perfil_user_imobiliaria");
const Status = require("../models/tb_status");
const Cliente = require("../models/tb_clientes");
const Funil = require("../models/tb_funil");

//POST de usuários

const cadastrarUsuarioConstrutora = async (req, res, next) => {
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
      initial: 2,
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

    const novoTeste = await ControleTeste.create({
      data_inicio: format(new Date(), "yyyy-MM-dd"),
      status: 2,
      id_plano: novoUsuario.id_plano,
      id_user: novoUsuario.id_user,
    });

    const progressStatus = await Progress.create({
      perfil: 1,
      logo_capa: 1,
      imovel: 1,
      publicacao: 1,
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
      // asaasResponse: response.data,
    };

    return res.status(202).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const cadastrarPessoaFisica = async (req, res, next) => {
  try {
    const perfilExistente = await Perfil.findOne({
      where: { cpf: req.body.cpf },
    });
    if (perfilExistente) {
      return res.status(409).send({
        mensagem: "CPF já cadastrado, por favor insira um CPF diferente!",
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
    const filenameCreci = req.file ? req.file.filename : "default-creci.pdf";
    const filenameLogo = req.file ? req.file.filename : "default-logo.png";

    const novoUsuario = await User.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: hashedPassword,
      avatar: `/avatar/${filename}`,
      id_plano: req.body.id_plano,
      id_status: 2,
      id_nivel: 7,
      initial: 1,
    });

    const novoperfil = await Perfil.create({
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      cep: req.body.cep,
      creci: `/documento/${filenameCreci}`,
      logo: `/logo/${filenameLogo}`,
      endereco: req.body.endereco,
      termos: "S",
      numero: req.body.numero,
      complemento: req.body.complemento,
      cidade: req.body.cidade,
      estado: req.body.estado,
      bairro: req.body.bairro,
      id_user: novoUsuario.id_user,
    });

    const novoTeste = await ControleTeste.create({
      data_inicio: format(new Date(), "yyyy-MM-dd"),
      status: 1,
      id_plano: novoUsuario.id_plano,
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
      logo_capa: 1,
      imovel: 1,
      publicacao: 1,
      id_user: novoUsuario.id_user,
    });

    const qrData = "https://zonu.com.br/";
    const qrCodeURL = await QRCode.toDataURL(qrData);

    const novoQrcode = await Qrcode.create({
      qrcode: qrCodeURL,
      tipo: 2,
      id_user: novoUsuario.id_user,
    });

    const htmlFilePath = path.join(
      __dirname,
      "../template/aviso/corretor.html"
    );
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    const token = jwt.sign(
      {
        id_user: novoUsuario.id_user,
        nome: novoUsuario.nome,
        sobrenome: novoUsuario.sobrenome,
        email: novoUsuario.email,
        avatar: novoUsuario.avatar,
        id_plano: novoUsuario.id_plano,
        id_nivel: novoUsuario.id_nivel,
        id_status: novoUsuario.id_status,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "6h",
      }
    );

    htmlContent = htmlContent
      .replace("{{nome}}", novoUsuario.nome)
      .replace("{{email}}", novoUsuario.email)
      .replace("{{idUser}}", token);

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
        periodo: novoTeste.id_controle,
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const cadastrarUsuarioCorretor = async (req, res, next) => {
  try {
    const perfilExistente = await Perfil.findOne({
      where: { cpf: req.body.cpf },
    });
    if (perfilExistente) {
      return res.status(409).send({
        mensagem: "CPF já cadastrado, por favor insira um CPF diferente!",
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
    const filenameCreci = req.file ? req.file.filename : "default-creci.pdf";
    const filenameDoc = req.file ? req.file.filename : "default-documento.png";
    
    const filenameYouLogo = req.files && req.files["logo"]
        ? req.files["logo"][0].filename
        : "default-logo.png";

    const novoUsuario = await User.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: hashedPassword,
      avatar: `/avatar/${filename}`,
      id_plano: req.body.id_plano,
      id_status: 2,
      id_nivel: 4,
      initial: 1,
    });

    const novoperfil = await Perfil.create({
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      cep: req.body.cep,
      creci: `/documento/${filenameCreci}`,
      logo: `/logo/${filenameYouLogo}`,
      doc_ofc: `/documento/${filenameDoc}`,
      endereco: req.body.endereco,
      termos: "S",
      numero: req.body.numero,
      complemento: req.body.complemento,
      cidade: req.body.cidade,
      estado: req.body.estado,
      bairro: req.body.bairro,
      id_user: novoUsuario.id_user,
    });

    const novoTeste = await ControleTeste.create({
      data_inicio: format(new Date(), "yyyy-MM-dd"),
      status: 1,
      id_plano: novoUsuario.id_plano,
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
      logo_capa: 1,
      imovel: 1,
      publicacao: 1,
      id_user: novoUsuario.id_user,
    });

    const qrData = "https://zonu.com.br/";
    const qrCodeURL = await QRCode.toDataURL(qrData);

    const novoQrcode = await Qrcode.create({
      qrcode: qrCodeURL,
      tipo: 2,
      id_user: novoUsuario.id_user,
    });

    const htmlFilePath = path.join(
      __dirname,
      "../template/aviso/corretor.html"
    );
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    const token = jwt.sign(
      {
        id_user: novoUsuario.id_user,
        nome: novoUsuario.nome,
        sobrenome: novoUsuario.sobrenome,
        email: novoUsuario.email,
        avatar: novoUsuario.avatar,
        id_plano: novoUsuario.id_plano,
        id_nivel: novoUsuario.id_nivel,
        id_status: novoUsuario.id_status,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "6h",
      }
    );

    htmlContent = htmlContent
      .replace("{{nome}}", novoUsuario.nome)
      .replace("{{email}}", novoUsuario.email)
      .replace("{{idUser}}", token);

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
        periodo: novoTeste.id_controle,
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const cadastrarUsuarioImobiliaria = async (req, res, next) => {
  try {
    const perfilExistente = await Perfil.findOne({
      where: { cnpj: req.body.cnpj },
    });
    if (perfilExistente) {
      return res.status(409).send({
        mensagem: "CNPJ já cadastrado, por favor insira um CPF diferente!",
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
    const filenameCreci = req.file ? req.file.filename : "default-creci.pdf";
    const filenameYouLogo = req.files && req.files["logo"]
        ? req.files["logo"][0].filename
        : "default-logo.png";
    const filenameCapa = req.file ? req.file.filename : "default-capa.png";
    const filenameCnpj = req.file ? req.file.filename : "default-cnpj.pdf";

    const novoUsuario = await User.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: hashedPassword,
      avatar: `/avatar/${filename}`,
      id_plano: req.body.id_plano,
      id_status: 2,
      id_nivel: 5,
      initial: 1,
    });

    const novoperfil = await Perfil.create({
      razao_social: req.body.razao_social,
      cnpj: req.body.cnpj,
      telefone: req.body.telefone,
      cep: req.body.cep,
      creci: `/documento/${filenameCreci}`,
      logo: `/logo/${filenameYouLogo}`,
      capa: `/capa/${filenameCapa}`,
      doc_cnpj: `/documento/${filenameCnpj}`,
      endereco: req.body.endereco,
      termos: "S",
      numero: req.body.numero,
      complemento: req.body.complemento,
      cidade: req.body.cidade,
      estado: req.body.estado,
      bairro: req.body.bairro,
      id_user: novoUsuario.id_user,
    });

    const novoTeste = await ControleTeste.create({
      data_inicio: format(new Date(), "yyyy-MM-dd"),
      status: 1,
      id_plano: req.body.id_plano,
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
      logo_capa: 1,
      imovel: 1,
      publicacao: 1,
      id_user: novoUsuario.id_user,
    });

    const qrData = "https://zonu.com.br/";
    const qrCodeURL = await QRCode.toDataURL(qrData);

    const novoQrcode = await Qrcode.create({
      qrcode: qrCodeURL,
      tipo: 2,
      id_user: novoUsuario.id_user,
    });

    const htmlFilePath = path.join(
      __dirname,
      "../template/aviso/corretor.html"
    );
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    const token = jwt.sign(
      {
        id_user: novoUsuario.id_user,
        nome: novoUsuario.nome,
        sobrenome: novoUsuario.sobrenome,
        email: novoUsuario.email,
        avatar: novoUsuario.avatar,
        id_plano: novoUsuario.id_plano,
        id_nivel: novoUsuario.id_nivel,
        id_status: novoUsuario.id_status,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "6h",
      }
    );

    htmlContent = htmlContent
      .replace("{{nome}}", novoUsuario.nome)
      .replace("{{email}}", novoUsuario.email)
      .replace("{{idUser}}", token);

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
        periodo: novoTeste.id_controle,
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const cadastrarSubUsuarioImobiliaria = async (req, res, next) => {
  try {
    const usuarioExistente = await PerfilUserImobiliaria.findOne({
      where: { email: req.body.email },
    });

    if (usuarioExistente) {
      return res.status(409).send({
        mensagem: "Email já cadastrado, por favor insira um email diferente!",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.senha, 10);
    const filename = req.file ? req.file.filename : "default-avatar.png";

    const novoUsuario = await PerfilUserImobiliaria.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: hashedPassword,
      id_perfil: req.body.id_perfil, // Perfil associado da imobiliária pai
      id_user: req.body.id_user, // ID da imobiliária pai
      id_nivel: 6, // Define o nível como 6
      id_status: 1, // Define o status como 1
    });

    // Geração de código e token
     /*
    const codigoAleatorio = Math.floor(1000 + Math.random() * 9000).toString();

    const code = await Code.create({
      type_code: 1,
      code: codigoAleatorio,
      id_user: novoUsuario.id_perfil_user,
    });

    const tokenUsuario = await Token.create({
      id_user: novoUsuario.id_perfil_user,
      token: uuidv4(),
    });

    const progressStatus = await Progress.create({
      perfil: 1,
      logo_capa: 1,
      imovel: 1,
      publicacao: 1,
      id_user: novoUsuario.id_perfil_user,
    });

    const qrData = "https://zonu.com.br/";
    const qrCodeURL = await QRCode.toDataURL(qrData);

    const novoQrcode = await Qrcode.create({
      qrcode: qrCodeURL,
      tipo: 2,
      id_user: novoUsuario.id_perfil_user,
    });
*/
    const response = {
      mensagem: "Usuário cadastrado com sucesso",
      usuarioCriado: {
        id_perfil_user: novoUsuario.id_perfil_user,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        nivel: novoUsuario.id_nivel,
        status: novoUsuario.id_status,
        id_perfil: novoUsuario.id_perfil,
        //token_unico: tokenUsuario.token,
        //code: code.code,
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const obterSubUsuarioImobiliaria = async (req, res, next) => {
  try {
    const { id_user } = req.params;

    const imobiliariaPai = await PerfilUserImobiliaria.findOne({
      where: { id_user },
    });

    if (!imobiliariaPai) {
      return res
        .status(404)
        .send({ mensagem: "Imobiliária pai não encontrada." });
    }

    const subUsuarios = await PerfilUserImobiliaria.findAll({
      where: {
        id_user: id_user,
        id_nivel: 6, // Nível dos subusuários
        id_status: 1,
      },
      include: [
        {
          model: Perfil,
          as: "perfil",
        },
        {
          model: Status,
          as: "status", // Incluindo status
        },
      ],
    });

    if (!subUsuarios || subUsuarios.length === 0) {
      return res.status(404).send({
        mensagem: "Nenhum subusuário encontrado para esta imobiliária pai.",
      });
    }

    const response = {
      mensagem: "Subusuários encontrados com sucesso",
      subUsuarios: subUsuarios.map((usuario) => ({
        id_perfil_user: usuario.id_perfil_user,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email,
        id_perfil: usuario.id_perfil,
        id_nivel: usuario.id_nivel,
        id_status: usuario.id_status,
      })),
    };

    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const cadastrarUsuarioAdministrador = async (req, res, next) => {
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
      id_status: 1,
      id_nivel: 1,
      initial: 1,
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
        progressao: progressStatus.perfil,
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
      id_nivel: 2,
      id_plano: req.body.id_plano,
      initial: 1,
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

const cadastrarUsuarioVip = async (req, res, next) => {
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
      id_nivel: req.body.id_nivel,
      id_plano: req.body.id_plano,
      initial: 1,
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
      subject: "⭐ Convite VIP - Zonu",
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada ao suporte", info.messageId);

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

//PUT envio de arquivos
const atualizarCreci = async (req, res, next) => {
  try {
    const { id_user } = req.params;

    const usuario = await Usuario.findByPk(id_user);

    if (!usuario) {
      return res.status(404).send({
        mensagem: "Usuário não encontrado.",
      });
    }

    const filenameCreci =
      req.files && req.files["creci"]
        ? req.files["creci"][0].filename
        : "default-creci.pdf";

    const perfil = await Perfil.findOne({ where: { id_user: id_user } });

    if (!perfil) {
      return res.status(404).send({
        mensagem: "Perfil não encontrado.",
      });
    }

    perfil.creci = `/documento/${filenameCreci}`;
    await perfil.save();

    const htmlFilePath = path.join(
      __dirname,
      "../template/aviso/documentosEnviados.html"
    );
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    htmlContent = htmlContent
      .replace("{{nome}}", usuario.nome)
      .replace("{{email}}", usuario.email);

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

    let email = usuario.email;

    let mailOptions = {
      from: `"Atendimento Zonu" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: "✅ Documentos Recebidos!",
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada: %s", info.messageId);

    return res.status(200).send({
      mensagem: "CRECI atualizado com sucesso!",
      creci: perfil.creci,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const atualizarDocCnpj = async (req, res, next) => {
  try {
    const { id_user } = req.params;

    const usuario = await Usuario.findByPk(id_user);

    if (!usuario) {
      return res.status(404).send({
        mensagem: "Usuário não encontradoo.",
      });
    }

    const filenameCnpj =
      req.files && req.files["doc_cnpj"]
        ? req.files["doc_cnpj"][0].filename
        : "default-cnpj.pdf";

    const perfil = await Perfil.findOne({ where: { id_user: id_user } });

    if (!perfil) {
      return res.status(404).send({
        mensagem: "Perfil não encontrado.",
      });
    }

    perfil.doc_cnpj = `/documento/${filenameCnpj}`;
    await perfil.save();

    const htmlFilePath = path.join(
      __dirname,
      "../template/aviso/documentosEnviados.html"
    );
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    htmlContent = htmlContent
      .replace("{{nome}}", usuario.nome)
      .replace("{{email}}", usuario.email);

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

    let email = usuario.email;

    let mailOptions = {
      from: `"Atendimento Zonu" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: "✅ Documentos Recebidos!",
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada: %s", info.messageId);

    return res.status(200).send({
      mensagem: "CRECI atualizado com sucesso!",
      creci: perfil.creci,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const atualizarFilenameDoc = async (req, res, next) => {
  try {
    const { id_user } = req.params;

    const usuario = await Usuario.findByPk(id_user);

    if (!usuario) {
      return res.status(404).send({
        mensagem: "Usuário não encontradoo.",
      });
    }

    const filenameDoc =
      req.files && req.files["doc_ofc"]
        ? req.files["doc_ofc"][0].filename
        : "default-doc_ofc.pdf";

    const perfil = await Perfil.findOne({ where: { id_user: id_user } });

    if (!perfil) {
      return res.status(404).send({
        mensagem: "Perfil não encontrado.",
      });
    }

    perfil.doc_ofc = `/documento/${filenameDoc}`;
    await perfil.save();

    const htmlFilePath = path.join(
      __dirname,
      "../template/aviso/documentosEnviados.html"
    );
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    htmlContent = htmlContent
      .replace("{{nome}}", usuario.nome)
      .replace("{{email}}", usuario.email);

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

    let email = usuario.email;

    let mailOptions = {
      from: `"Atendimento Zonu" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: "✅ Documentos Recebidos!",
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada: %s", info.messageId);

    return res.status(200).send({
      mensagem: "DOCUMENTO atualizado com sucesso!",
      document: perfil.doc_oficial,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const editarUsuarioSimples = async (req, res, next) => {
  try {
    const { id_user } = req.params;

    const usuarioExistente = await User.findByPk(id_user);
    if (!usuarioExistente) {
      return res.status(404).send({
        mensagem: "Usuário não encontradoo",
      });
    }

    const filename = req.file ? req.file.filename : usuarioExistente.avatar;
    const hashedPassword = req.body.senha
      ? await bcrypt.hash(req.body.senha, 10)
      : usuarioExistente.senha;

    await User.update(
      {
        nome: req.body.nome || usuarioExistente.nome,
        sobrenome: req.body.sobrenome || usuarioExistente.sobrenome,
        email: req.body.email || usuarioExistente.email,
        senha: hashedPassword,
        avatar: `/avatar/${filename}`,
        id_plano: req.body.id_plano || usuarioExistente.id_plano,
        id_status: req.body.id_status || usuarioExistente.id_status,
        id_nivel: req.body.id_nivel || usuarioExistente.id_nivel,
      },
      { where: { id_user: id_user } }
    );

    if (req.body.novo_qr_code) {
      const qrData = "https://zonu.com.br/";
      const qrCodeURL = await QRCode.toDataURL(qrData);

      await Qrcode.update(
        {
          qrcode: qrCodeURL,
          tipo: 2,
          id_user: id_user,
        },
        { where: { id_user: id_user } }
      );
    }

    return res.status(200).send({
      mensagem: "Usuário atualizado com sucesso",
      usuarioAtualizado: {
        id_user: id_user,
        nome: req.body.nome || usuarioExistente.nome,
        email: req.body.email || usuarioExistente.email,
      },
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const editarCliente = async (req, res, next) => {
  try {
    const { id_user } = req.params;

    const usuarioExistente = await User.findByPk(id_user);
    if (!usuarioExistente) {
      return res.status(404).send({
        mensagem: "Usuário não encontradoo",
      });
    }

    const perfilExistente = await Perfil.findOne({
      where: { id_user: id_user },
    });
    if (!perfilExistente) {
      return res.status(404).send({
        mensagem: "Perfil não encontrado",
      });
    }

    if (req.body.email && req.body.email !== usuarioExistente.email) {
      const emailExistente = await User.findOne({
        where: { email: req.body.email },
      });
      if (emailExistente) {
        return res.status(409).send({
          mensagem: "Email já cadastrado, por favor insira um email diferente!",
        });
      }
    }

    if (req.body.cnpj && req.body.cnpj !== perfilExistente.cnpj) {
      const cnpjExistente = await Perfil.findOne({
        where: { cnpj: req.body.cnpj },
      });
      if (cnpjExistente) {
        return res.status(409).send({
          mensagem: "CNPJ já cadastrado, por favor insira um CNPJ diferente!",
        });
      }
    }

    const hashedPassword = req.body.senha
      ? await bcrypt.hash(req.body.senha, 10)
      : usuarioExistente.senha;
    const filename = req.file ? req.file.filename : usuarioExistente.avatar;
    const filenameLogo = req.file ? req.file.filename : perfilExistente.avatar;
    const filenameCapa = req.file ? req.file.filename : perfilExistente.capa;

    await User.update(
      {
        nome: req.body.nome || usuarioExistente.nome,
        sobrenome: req.body.sobrenome || usuarioExistente.sobrenome,
        email: req.body.email || usuarioExistente.email,
        senha: hashedPassword,
        avatar: `/avatar/${filename}`,
        id_plano: req.body.id_plano || usuarioExistente.id_plano,
        id_status: req.body.id_status || usuarioExistente.id_status,
        id_nivel: req.body.id_nivel || usuarioExistente.id_nivel,
      },
      { where: { id_user: id_user } }
    );

    await Perfil.update(
      {
        razao_social: req.body.razao_social || perfilExistente.razao_social,
        cnpj: req.body.cnpj || perfilExistente.cnpj,
        telefone: req.body.telefone || perfilExistente.telefone,
        cep: req.body.cep || perfilExistente.cep,
        avatar: `/logo/${filenameLogo}`,
        capa: `/capa/${filenameCapa}`,
        endereco: req.body.endereco || perfilExistente.endereco,
        termos: req.body.termos || perfilExistente.termos,
        numero: req.body.numero || perfilExistente.numero,
        complemento: req.body.complemento || perfilExistente.complemento,
        cidade: req.body.cidade || perfilExistente.cidade,
        estado: req.body.estado || perfilExistente.estado,
        bairro: req.body.bairro || perfilExistente.bairro,
      },
      { where: { id_user: id_user } }
    );

    return res.status(200).send({
      mensagem: "Cliente atualizado com sucesso",
      usuarioAtualizado: {
        id_user: id_user,
        nome: req.body.nome || usuarioExistente.nome,
        email: req.body.email || usuarioExistente.email,
        id_perfil: perfilExistente.id_perfil,
        razao_social: req.body.razao_social || perfilExistente.razao_social,
        cnpj: req.body.cnpj || perfilExistente.cnpj,
      },
    });
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

    await usuario.save();

    return res.status(200).send({ mensagem: "Senha alterada com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const excluirUsuario = async (req, res, next) => {
  try {
    const id_user = req.params.id_user;

    const tabelas = [
      Qrcode,
      Token,
      Code,
      Perfil,
      Progress,
      Imovel,
      Condominio,
      Controle,
      LinkTemporario,
      Cliente,
      Funil,
    ];

    for (const tabela of tabelas) {
      await tabela.destroy({ where: { id_user } });
    }

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
  cadastrarUsuarioCorretor,
  atualizarCreci,
  atualizarDocCnpj,
  obterUsuarios,
  obterUsuarioPorId,
  validaCode,
  obterUsuarioPorEmail,
  trocaSenhaporEmail,
  atualizarUsuario,
  excluirUsuario,
  cadastrarUsuarioImobiliaria,
  cadastrarSubUsuarioImobiliaria,
  cadastrarUsuarioVip,
  cadastrarUsuarioConstrutora,
  cadastrarUsuarioAdministrador,
  cadastrarEquipeZonu,
  trocaSenha,
  atualizarStatusUsuario,
  atualizarDadosUsuario,
  editarUsuarioSimples,
  editarCliente,
  cadastrarPessoaFisica,
  obterSubUsuarioImobiliaria,
  atualizarFilenameDoc
};