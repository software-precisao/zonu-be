const express = require("express");
const QRCode = require("qrcode");
const Info = require("../models/tb_info_imovel");
const Comodos = require("../models/tb_comodos");
const Medidas = require("../models/tb_medidas");
const Preco = require("../models/tb_preco");
const Foto = require("../models/tb_imagem_imovel");
const Caracteristicas = require("../models/tb_imovel_caracteristica");
const Caracteristica = require("../models/tb_caracteristica");
const Localizacao = require("../models/tb_localizacao");
const Descricao = require("../models/tb_descricao");
const Proximidades = require("../models/tb_imovel_proximidades");
const Proximidade = require("../models/tb_proximidades");
const Complemento = require("../models/tb_complementos");
const Publicacao = require("../models/tb_publicacao");
const Imovel = require("../models/tb_imovel");
const Qrcode = require("../models/tb_qrcode");
const User = require("../models/tb_usuarios");
const Negocio = require("../models/tb_negocio");
const Perfil = require("../models/tb_perfil");

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs").promises;
require("dotenv").config();

const criarImovel = async (req, res) => {
  try {
    const tabInfo = await Info.create({
      cod_referencia: req.body.cod_referencia,
      tipo: req.body.tipo_imovel,
      perfil_imovel: req.body.perfil_imovel,
      situacao_imovel: req.body.situacao_imovel,
      ano_construcao: req.body.ano_construcao,
      incorporacao: req.body.incorporacao,
      posicao_solar: req.body.posicao_solar,
      terreno: req.body.terreno,
      proximo_mar: req.body.proximo_mar,
      averbado: req.body.averbado,
      escriturado: req.body.escriturado,
      esquina: req.body.esquina,
      mobilia: req.body.mobilia,
      email: req.body.email,
      nome: req.body.nome,
    });

    const tabComodos = await Comodos.create({
      dormitorio: req.body.dormitorio,
      suite: req.body.suite,
      agenciador: req.body.agenciador,
      banheiro: req.body.banheiro,
      garagem: req.body.garagem,
      garagem_coberta: req.body.garagem_coberta,
      garagem_box: req.body.garagem_box,
      sala_tv: req.body.sala_tv,
      sala_jantar: req.body.sala_jantar,
      lavabo: req.body.lavabo,
      area_servico: req.body.area_servico,
      cozinha: req.body.cozinha,
      closet: req.body.closet,
      escritorio: req.body.escritorio,
      casa_empregada: req.body.casa_empregada,
      copa: req.body.copa,
    });

    const tabPreco = await Preco.create({
      tipo_negocio: req.body.tipo_negocio,
      preco_imovel: req.body.preco_imovel,
      mostra_preco: req.body.mostra_preco,
      text_preco_opcao: req.body.text_preco_opcao,
      preco_iptu: req.body.preco_iptu,
      periodo: req.body.periodo,
      preco_condominio: req.body.preco_condominio,
      financiado: req.body.financiado,
      aceita_financiamento: req.body.aceita_financiamento,
      minhacasa_minhavida: req.body.minhacasa_minhavida,
      total_mensal_taxas: req.body.total_mensal_taxas,
      descricao_taxas: req.body.descricao_taxas,
      aceita_permuta: req.body.aceita_permuta,
      descricao_permuta: req.body.descricao_permuta,
      valor_metro_quadrado: req.body.valor_metro_quadrado,
    });

    const precoImovel = parseFloat(tabPreco.preco_imovel);
    const areaTotal = parseFloat(req.body.area_total);
    const mediaMetroQuadrado = (precoImovel / areaTotal).toFixed(2);

    const tabMedidas = await Medidas.create({
      area_contruida: parseFloat(req.body.area_contruida.replace(",", ".")),
      area_privativa: parseFloat(req.body.area_privativa.replace(",", ".")),
      area_total: areaTotal,
      media_metro_quadrado: mediaMetroQuadrado,
    });

    const tabLocalizacao = await Localizacao.create({
      cep: req.body.cep,
      pais: req.body.pais,
      estado: req.body.estado,
      cidade: req.body.cidade,
      bairro: req.body.bairro,
      logradouro: req.body.logradouro,
      numero: req.body.numero,
      complemento: req.body.complemento,
      numero_unidade: req.body.numero_unidade,
      andar: req.body.andar,
      unidade_por_andar: req.body.unidade_por_andar,
      total_andar: req.body.total_andar,
      total_torres: req.body.total_torres,
      mostrar_andar_site: req.body.mostrar_andar_site,
      mostrar_numero_unidade_site: req.body.mostrar_numero_unidade_site,
      mostrar_logradouro_site: req.body.mostrar_logradouro_site,
      mostrar_bairro_site: req.body.mostrar_bairro_site,
      mostrar_complemento_site: req.body.mostrar_complemento_site,
      mostrar_numero_site: req.body.mostrar_numero_site,
      mostrar_nome_condominio_site: req.body.mostrar_nome_condominio_site,
      mostrar_mapa_site: req.body.mostrar_mapa_site,
    });

    const tabDescricao = await Descricao.create({
      titulo: req.body.titulo,
      apresentacao: req.body.descricao,
    });

    const tabComplemento = await Complemento.create({
      link_youtube: req.body.link_youtube,
      link_apresentacao: req.body.link_apresentacao,
      link_drive: req.body.link_drive,
    });

    const tabPublicacao = await Publicacao.create({
      mostrar_imovel_publi: req.body.mostrar_imovel_publi,
      tarja_imovel_site_publi: req.body.tarja_imovel_site_publi,
      cor_tarja_publi: req.body.cor_tarja_publi,
    });

    const NovoImovel = await Imovel.create({
      id_info: tabInfo.id_info,
      tem_condominio: req.body.tem_condominio,
      id_condominio: req.body.id_condominio || null,
      id_proprietario: req.body.id_user,
      id_comodos: tabComodos.id_comodos,
      id_medidas: tabMedidas.id_medidas,
      id_preco: tabPreco.id_preco,
      id_localizacao: tabLocalizacao.id_localizacao,
      id_descricao: tabDescricao.id_descricao,
      id_complemento: tabComplemento.id_complemento,
      id_publicacao: tabPublicacao.id_publicacao,
      id_user: req.body.id_user,
    });

    const defaultFilename = "default-foto.png";

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map((file) =>
          Foto.create({
            foto: `/foto/${file.filename}`,
            id_imovel: NovoImovel.id_imovel,
          })
        )
      );
    } else {
      await Foto.create({
        foto: `/foto/${defaultFilename}`,
        id_imovel: NovoImovel.id_imovel,
      });
    }

    let caracteristicas = [];
    try {
      console.log(
        "Recebido para caracteristicas:",
        req.body.id_caracteristicas
      );
      caracteristicas = JSON.parse(req.body.id_caracteristicas);
    } catch (error) {
      console.log("Erro ao analisar caracteristicas:", error);
      return res
        .status(400)
        .send({ mensagem: "Formato inválido para caracteristicas" });
    }
    if (Array.isArray(caracteristicas)) {
      await Promise.all(
        caracteristicas.map((item) =>
          Caracteristicas.create({
            id_caracteristica: item,
            id_imovel: NovoImovel.id_imovel,
          })
        )
      );
    }

    let proximidades = [];
    try {
      console.log("Recebido para caracteristicas:", req.body.id_proximidades);
      proximidades = JSON.parse(req.body.id_proximidades);
    } catch (error) {
      return res
        .status(400)
        .send({ mensagem: "Formato inválido para proximidades" });
    }
    if (Array.isArray(proximidades)) {
      await Promise.all(
        proximidades.map((dado) =>
          Proximidades.create({
            id_proximidades: dado,
            id_imovel: NovoImovel.id_imovel,
          })
        )
      );
    }

    const qrData = "https://zonu.com.br/imovel?id=" + NovoImovel.id_imovel;
    const qrCodeURL = await QRCode.toDataURL(qrData);

    const novoQrcode = await Qrcode.create({
      qrcode: qrCodeURL,
      tipo: 1,
      id_user: req.body.id_user,
      id_imovel: NovoImovel.id_imovel,
    });

    const htmlFilePath = path.join(__dirname, "../template/imovel/index.html");
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    htmlContent = htmlContent
      .replace("{{nome}}", req.body.nome)
      .replace("{{email}}", req.body.email);

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
      to: req.body.email,
      subject: "🎉 Toc Toc Toc... Temos um novo imóvel!`,",
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada: %s", info.messageId);

    const imoveisCount = await Imovel.count({
      where: { id_user: req.body.id_user },
    });
    console.log(
      `Total de imóveis para o usuário ${req.body.id_user}: ${imoveisCount}`
    );

    if (imoveisCount === 1) {
      await User.update(
        { initial: 1 },
        { where: { id_user: req.body.id_user } }
      );

      const usuarioAtualizado = await User.findOne({
        where: { id_user: req.body.id_user },
      });
      console.log("Usuário atualizado:", usuarioAtualizado);
    }

    return res.status(200).send("Imovel criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar Imovel: ", error);
    return res
      .status(500)
      .send({ mensagem: "Erro ao criar Imovel: ", error: error.message });
  }
};

const editarImovel = async (req, res) => {
  try {
    const { id_imovel } = req.params;

    const imovelExistente = await Imovel.findByPk(id_imovel);
    if (!imovelExistente) {
      return res.status(404).send({ mensagem: "Imóvel não encontrado" });
    }

    const tabInfo = await Info.update(
      {
        cod_referencia: req.body.cod_referencia,
        tipo: req.body.tipo_imovel,
        perfil_imovel: req.body.perfil_imovel,
        situacao_imovel: req.body.situacao_imovel,
        ano_construcao: req.body.ano_construcao,
        incorporacao: req.body.incorporacao,
        posicao_solar: req.body.posicao_solar,
        terreno: req.body.terreno,
        proximo_mar: req.body.proximo_mar,
        averbado: req.body.averbado,
        escriturado: req.body.escriturado,
        esquina: req.body.esquina,
        mobilia: req.body.mobilia,
        email: req.body.email,
        nome: req.body.nome,
      },
      { where: { id_info: imovelExistente.id_info } }
    );

    const tabComodos = await Comodos.update(
      {
        dormitorio: req.body.dormitorio,
        suite: req.body.suite,
        agenciador: req.body.agenciador,
        banheiro: req.body.banheiro,
        garagem: req.body.garagem,
        garagem_coberta: req.body.garagem_coberta,
        garagem_box: req.body.garagem_box,
        sala_tv: req.body.sala_tv,
        sala_jantar: req.body.sala_jantar,
        lavabo: req.body.lavabo,
        area_servico: req.body.area_servico,
        cozinha: req.body.cozinha,
        closet: req.body.closet,
        escritorio: req.body.escritorio,
        casa_empregada: req.body.casa_empregada,
        copa: req.body.copa,
      },
      { where: { id_comodos: imovelExistente.id_comodos } }
    );

    const tabPreco = await Preco.update(
      {
        tipo_negocio: req.body.tipo_negocio,
        preco_imovel: req.body.preco_imovel,
        mostra_preco: req.body.mostra_preco,
        text_preco_opcao: req.body.text_preco_opcao,
        preco_iptu: req.body.preco_iptu,
        periodo: req.body.periodo,
        preco_condominio: req.body.preco_condominio,
        financiado: req.body.financiado,
        aceita_financiamento: req.body.aceita_financiamento,
        minhacasa_minhavida: req.body.minhacasa_minhavida,
        total_mensal_taxas: req.body.total_mensal_taxas,
        descricao_taxas: req.body.descricao_taxas,
        aceita_permuta: req.body.aceita_permuta,
        descricao_permuta: req.body.descricao_permuta,
        valor_metro_quadrado: req.body.valor_metro_quadrado,
      },
      { where: { id_preco: imovelExistente.id_preco } }
    );

    const precoImovel = parseFloat(req.body.preco_imovel);
    const areaTotal = parseFloat(req.body.area_total);
    const mediaMetroQuadrado = (precoImovel / areaTotal).toFixed(2);

    const tabMedidas = await Medidas.update(
      {
        area_contruida: parseFloat(req.body.area_contruida.replace(",", ".")),
        area_privativa: parseFloat(req.body.area_privativa.replace(",", ".")),
        area_total: areaTotal,
        media_metro_quadrado: mediaMetroQuadrado,
      },
      { where: { id_medidas: imovelExistente.id_medidas } }
    );

    const tabLocalizacao = await Localizacao.update(
      {
        cep: req.body.cep,
        pais: req.body.pais,
        estado: req.body.estado,
        cidade: req.body.cidade,
        bairro: req.body.bairro,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        complemento: req.body.complemento,
        numero_unidade: req.body.numero_unidade,
        andar: req.body.andar,
        unidade_por_andar: req.body.unidade_por_andar,
        total_andar: req.body.total_andar,
        total_torres: req.body.total_torres,
        mostrar_andar_site: req.body.mostrar_andar_site,
        mostrar_numero_unidade_site: req.body.mostrar_numero_unidade_site,
        mostrar_logradouro_site: req.body.mostrar_logradouro_site,
        mostrar_bairro_site: req.body.mostrar_bairro_site,
        mostrar_complemento_site: req.body.mostrar_complemento_site,
        mostrar_numero_site: req.body.mostrar_numero_site,
        mostrar_nome_condominio_site: req.body.mostrar_nome_condominio_site,
        mostrar_mapa_site: req.body.mostrar_mapa_site,
      },
      { where: { id_localizacao: imovelExistente.id_localizacao } }
    );

    const tabDescricao = await Descricao.update(
      {
        titulo: req.body.titulo,
        apresentacao: req.body.descricao,
      },
      { where: { id_descricao: imovelExistente.id_descricao } }
    );

    const tabComplemento = await Complemento.update(
      {
        link_youtube: req.body.link_youtube,
        link_apresentacao: req.body.link_apresentacao,
        link_drive: req.body.link_drive,
      },
      { where: { id_complemento: imovelExistente.id_complemento } }
    );

    const tabPublicacao = await Publicacao.update(
      {
        mostrar_imovel_publi: req.body.mostrar_imovel_publi,
        tarja_imovel_site_publi: req.body.tarja_imovel_site_publi,
        cor_tarja_publi: req.body.cor_tarja_publi,
      },
      { where: { id_publicacao: imovelExistente.id_publicacao } }
    );

    if (req.files && req.files.length > 0) {
      await Foto.destroy({ where: { id_imovel: id_imovel } });
      await Promise.all(
        req.files.map((file) =>
          Foto.create({
            foto: `/foto/${file.filename}`,
            id_imovel: id_imovel,
          })
        )
      );
    }

    let caracteristicas = [];
    try {
      if (req.body.id_caracteristicas) {
        caracteristicas = JSON.parse(req.body.id_caracteristicas).filter(
          (id) => id > 0
        );
      }
    } catch (error) {
      console.log("Erro ao analisar características:", error);
      return res
        .status(400)
        .send({ mensagem: "Formato inválido para características" });
    }

    if (Array.isArray(caracteristicas) && caracteristicas.length > 0) {
      const validCaracteristicas = await Caracteristica.findAll({
        where: {
          id_caracteristica: caracteristicas,
        },
      });

      if (validCaracteristicas.length !== caracteristicas.length) {
        return res
          .status(400)
          .send({ mensagem: "Uma ou mais características são inválidas" });
      }

      await Caracteristicas.destroy({ where: { id_imovel: id_imovel } });

      await Promise.all(
        caracteristicas.map((item) =>
          Caracteristicas.create({
            id_caracteristica: item,
            id_imovel: id_imovel,
          })
        )
      );
    }
    let proximidades = [];
    try {
      if (req.body.id_proximidades) {
        proximidades = JSON.parse(req.body.id_proximidades).filter(
          (id) => id > 0
        );
      }
    } catch (error) {
      console.log("Erro ao analisar proximidades:", error);
      return res
        .status(400)
        .send({ mensagem: "Formato inválido para proximidades" });
    }

    if (Array.isArray(proximidades) && proximidades.length > 0) {
      const validProximidades = await Proximidade.findAll({
        where: {
          id_proximidade: proximidades,
        },
      });

      if (validProximidades.length !== proximidades.length) {
        return res
          .status(400)
          .send({ mensagem: "Uma ou mais proximidades são inválidas" });
      }
      await Proximidades.destroy({ where: { id_imovel: id_imovel } });

      await Promise.all(
        proximidades
          .filter((d) => !!d)
          .map((dado) => {
            console.log(`Cadastrando proximidade de id ${dado} -
            ${typeof dado} - ${id_imovel}
            `);

            return Proximidades.create({
              id_proximidades: Number(dado),
              id_imovel: id_imovel,
            });
          })
      );
    }

    const qrData = "https://zonu.com.br/imovel?id=" + id_imovel;
    const qrCodeURL = await QRCode.toDataURL(qrData);

    await Qrcode.update(
      {
        qrcode: qrCodeURL,
        tipo: 1,
        id_user: req.body.id_user,
      },
      { where: { id_imovel: id_imovel } }
    );

    return res.status(200).send("Imóvel atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar Imóvel: ", error);
    return res
      .status(500)
      .send({ mensagem: "Erro ao atualizar Imóvel: ", error: error.message });
  }
};

const obterImovelCompletoId = async (req, res) => {
  try {
    const { id_imovel } = req.params;

    const imovel = await Imovel.findByPk(id_imovel, {
      include: [
        { model: Info, as: "info" },
        { model: Comodos, as: "comodos" },
        { model: Medidas, as: "medidas" },
        { model: Preco, as: "preco" },
        { model: Foto, as: "fotos" },
        {
          model: Caracteristicas,
          as: "caracteristicas",
          include: [
            {
              model: Caracteristica,
              as: "detalhesCaracteristica",
            },
          ],
        },
        { model: Localizacao, as: "localizacao" },
        { model: Descricao, as: "descricao" },
        {
          model: Proximidades,
          as: "proximidades",
          include: [
            {
              model: Proximidade,
              as: "detalhesProximidade",
            },
          ],
        },
        { model: Complemento, as: "complemento" },
        { model: Publicacao, as: "publicacao" },
        { model: Qrcode, as: "qrcode" },
        { model: User, as: "usuario" },
      ],
    });

    if (!imovel) {
      return res.status(404).send({ message: "Imóvel não encontrado" });
    }

    const perfil = await Perfil.findOne({
      where: {
        id_user: imovel.usuario.id_user,
      },
    });

    const imovelResponse = {
      ...imovel.dataValues,
      perfil: perfil ? perfil.dataValues : perfil,
    };

    return res.status(200).send(imovelResponse);
  } catch (error) {
    console.error("Erro ao buscar Imóvel: ", error);
    return res.status(500).send({ error: error.message });
  }
};

const obterTodosImoveisCompletos = async (req, res) => {
  try {
    const imoveis = await Imovel.findAll({
      include: [
        { model: Info, as: "info" },
        { model: Comodos, as: "comodos" },
        { model: Medidas, as: "medidas" },
        { model: Preco, as: "preco" },
        { model: Foto, as: "fotos" },
        {
          model: Caracteristicas,
          as: "caracteristicas",
          include: [
            {
              model: Caracteristica,
              as: "detalhesCaracteristica",
            },
          ],
        },
        { model: Localizacao, as: "localizacao" },
        { model: Descricao, as: "descricao" },
        {
          model: Proximidades,
          as: "proximidades",
          include: [
            {
              model: Proximidade,
              as: "detalhesProximidade",
            },
          ],
        },
        { model: Complemento, as: "complemento" },
        { model: Publicacao, as: "publicacao" },
        { model: Qrcode, as: "qrcode" },
        { model: User, as: "usuario" },
      ],
    });

    const imoveisResponse = [];
    for (let i = 0; i < imoveis.length; i++) {
      const imovel = { ...imoveis[i].dataValues };

      const perfil = await Perfil.findOne({
        where: {
          id_user: imovel.usuario.id_user,
        },
      });

      imoveisResponse.push({
        ...imovel,
        perfil: perfil ? perfil.dataValues : perfil,
      });
    }

    if (!imoveis) {
      return res.status(404).send({ message: "Imóvel não encontrado" });
    }

    return res.status(200).send(imoveisResponse);
  } catch (error) {
    console.error("Erro ao buscar Imóvel: ", error);
    return res.status(500).send({ error: error.message });
  }
};

const obterImovelCompletoIdUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    const imovel = await Imovel.findAll({
      where: { id_user },
      include: [
        { model: Info, as: "info" },
        { model: Comodos, as: "comodos" },
        { model: Medidas, as: "medidas" },
        { model: Preco, as: "preco" },
        { model: Foto, as: "fotos" },
        // { model: Caracteristicas, as: "caracteristicas" },
        {
          model: Caracteristicas,
          as: "caracteristicas",
          include: [
            {
              model: Caracteristica,
              as: "detalhesCaracteristica",
            },
          ],
        },
        { model: Localizacao, as: "localizacao" },
        { model: Descricao, as: "descricao" },
        {
          model: Proximidades,
          as: "proximidades",
          include: [
            {
              model: Proximidade,
              as: "detalhesProximidade",
            },
          ],
        },
        { model: Complemento, as: "complemento" },
        { model: Publicacao, as: "publicacao" },
        { model: Qrcode, as: "qrcode" },
        { model: User, as: "usuario" },
      ],
    });

    if (!imovel) {
      return res.status(404).send({ message: "Imóvel não encontrado" });
    }

    return res.status(200).send(imovel);
  } catch (error) {
    console.error("Erro ao buscar Imóvel: ", error);
    return res.status(500).send({ error: error.message });
  }
};

const obterBairro = async (req, res) => {
  try {
    const bairro = await Localizacao.findAll();
    if (!bairro) {
      return res.status(404).send({ message: "Endereços não encontrados" });
    }
    return res.status(200).send(bairro);
  } catch (error) {
    console.error("Erro ao buscar endereços: ", error);
    return res.status(500).send({ error: error.message });
  }
};

const excluirImovel = async (req, res) => {
  try {
    const { id_imovel } = req.params;

    const imovel = await Imovel.findOne({ where: { id_imovel } });
    if (!imovel) {
      return res.status(404).json({ mensagem: "Imóvel não encontrado" });
    }

    await Negocio.destroy({ where: { id_imovel } });

    await Imovel.destroy({ where: { id_imovel } });

    return res.status(200).json({ mensagem: "Imóvel excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir o imóvel:", error);
    return res
      .status(500)
      .json({ mensagem: "Erro ao excluir o imóvel", error: error.message });
  }
};

module.exports = {
  criarImovel,
  obterImovelCompletoId,
  obterTodosImoveisCompletos,
  obterImovelCompletoIdUser,
  excluirImovel,
  obterBairro,
  editarImovel,
};
