const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/tb_usuarios");
const Perfil = require("../models/tb_perfil");
const MyToken = require("../models/tb_token");
const Qrcode = require("../models/tb_qrcode");
const Controle = require("../models/tb_controle_teste");
const UserStatus = require("../models/tb_user_status");


const autenticarUsuario = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const user = await Usuario.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).send({
        mensagem: "Falha na autenticação.",
      });
    }

    const controle = await Controle.findOne({ where: { id_user: user.id_user } });
    if (controle) {
      const dataFimTeste = new Date(controle.data_inicio);
      dataFimTeste.setDate(dataFimTeste.getDate() + 7);

      if (new Date() > dataFimTeste && controle.status === 1) {
        return res.status(203).send({
          mensagem: "Período de teste expirado.",
        });
      }
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (isPasswordValid) {
      const userStatus = await UserStatus.findOne({ where: { id_user: user.id_user } });
      if (userStatus && userStatus.status === 1) {
        return res.status(403).send({
          mensagem: "Usuário já está logado em outro dispositivo.",
        });
      }

      const perfil = await Perfil.findOne({ where: { id_user: user.id_user } });
      const mytoken = await MyToken.findOne({ where: { id_user: user.id_user } });
      const qrcode = await Qrcode.findOne({ where: { id_user: user.id_user } });
      const token = jwt.sign(
        {
          id_user: user.id_user,
          nome: user.nome,
          sobrenome: user.sobrenome,
          email: user.email,
          avatar: user.avatar,
          id_plano: user.id_plano,
          id_nivel: user.id_nivel,
          id_status: user.id_status,
          perfil: perfil,
          token: mytoken,
          qrcode: qrcode

        },
        process.env.JWT_KEY,
        {
          expiresIn: "6h",
        }
      );

      return res.status(200).send({
        mensagem: "Autenticado com sucesso!",
        token: token,
        id_status: user.id_status

      });
    } else {
      return res.status(401).send({ mensagem: "Falha na autenticação." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const logoutUsuario = async (req, res, next) => {
  try {
    const { id_user } = req.body;

    const user = await Usuario.findByPk(id_user);

    if (!user) {
      return res.status(404).send({
        mensagem: "Usuário não encontrado.",
      });
    }

    await UserStatus.upsert({ id_user: user.id_user, status: 0 });

    return res.status(200).send({
      mensagem: "Logout realizado com sucesso!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  autenticarUsuario,
  logoutUsuario
};