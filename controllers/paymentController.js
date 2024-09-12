const TokenPayment = require("../models/tb_token_payment");
const PaymentReference = require("../models/tb_pagamento");
const Usuario = require("../models/tb_usuarios");

const criarPagamentoRecorrente = async (req, res) => {
  try {
    const fetch = await import('node-fetch').then(mod => mod.default);
    const { customerId, billingType, value, dueDate, nextDueDate, description, creditCard, cycle, creditCardHolderInfo } = req.body;

    // Verificar se o customerId está presente e válido
    if (!customerId) {
      return res.status(400).send({ error: 'Customer ID é obrigatório.' });
    }

    // Buscar o token da API no banco de dados
    const tokenData = await TokenPayment.findOne();
    if (!tokenData) {
      return res.status(500).send({ error: 'Token da API não encontrado.' });
    }

    const apiKey = tokenData.api_key;

    // Adicionar log para verificar o token e o customerId
    console.log('Token da API:', apiKey);
    console.log('Customer ID:', customerId);

    // Configurar o payload com base no tipo de pagamento
    let payload = {
      customer: customerId,
      billingType,
      value,
      dueDate,
      nextDueDate,
      cycle,
      description,
    };

    if (billingType === 'CREDIT_CARD' && creditCard) {
      payload.creditCard = {
        holderName: creditCard.holderName,
        number: creditCard.number,
        expiryMonth: creditCard.expiryMonth,
        expiryYear: creditCard.expiryYear,
        ccv: creditCard.ccv
      };
      payload.creditCardHolderInfo = creditCardHolderInfo;
    }

    const url = 'https://sandbox.asaas.com/api/v3/payments';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access_token': apiKey,
        'User-Agent': 'chrome'
      },
      body: JSON.stringify(payload)
    };

    // Fazer a requisição para a API do Asaas para criar o pagamento
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      console.error('Erro da API Asaas:', data);
      throw new Error(data.errors ? data.errors[0].description : 'Erro ao criar pagamento recorrente no Asaas');
    }

    // Se o pagamento for PIX, buscar o QR Code e o código de copia e cola
    if (billingType === 'PIX') {
      const pixQrCodeUrl = `https://sandbox.asaas.com/api/v3/payments/${data.id}/pixQrCode`;
      const pixQrCodeOptions = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'access_token': apiKey,
          'User-Agent': 'chrome'
        }
      };

      const pixQrCodeResponse = await fetch(pixQrCodeUrl, pixQrCodeOptions);
      const pixQrCodeData = await pixQrCodeResponse.json();

      if (pixQrCodeResponse.ok) {
        data.pixQrCode = pixQrCodeData.encodedImage;
        data.pixCopyPaste = pixQrCodeData.payload;
      } else {
        console.error('Erro ao obter dados do PIX:', pixQrCodeData);
        throw new Error(pixQrCodeData.errors ? pixQrCodeData.errors[0].description : 'Erro ao obter dados do PIX');
      }
    }

    res.send(data);
  } catch (error) {
    console.error('Erro ao criar pagamento recorrente no Asaas:', error.message);
    console.error('Detalhes do erro:', error);
    res.status(500).send({ error: error.message });
  }
};

const verificarPagamento = async (req, res) => {
  try {
    const fetch = await import("node-fetch").then((mod) => mod.default);
    const { paymentId } = req.params;

    // Buscar o token da API no banco de dados
    const tokenData = await TokenPayment.findOne();
    if (!tokenData) {
      return res.status(500).send({ error: "Token da API não encontrado." });
    }

    const apiKey = tokenData.api_key;

    const url = `https://sandbox.asaas.com/api/v3/payments/${paymentId}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        access_token: apiKey,
        "User-Agent": "chrome",
      },
    };

    // Fazer a requisição para a API do Asaas para verificar o status do pagamento
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      console.error("Erro da API Asaas:", data);
      throw new Error(
        data.errors
          ? data.errors[0].description
          : "Erro ao verificar status do pagamento no Asaas"
      );
    }

    res.send(data);
  } catch (error) {
    console.error(
      "Erro ao verificar status do pagamento no Asaas:",
      error.message
    );
    console.error("Detalhes do erro:", error);
    res.status(500).send({ error: error.message });
  }
};

const salvarReferenciaPagamento = async (req, res) => {
  const { id_user, id_cobranca } = req.body;

  if (!id_user) {
    return res.status(400).send({ error: "O ID do usuário é obrigatório." });
  }

  try {
    const novaReferencia = await PaymentReference.create({
      id_user,
      id_cobranca,
      status_pago: 1,
    });

    return res.status(201).send({
      mensagem: "Referência de pagamento salva com sucesso.",
      novaReferencia,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const consultarTodosPagamentos = async (req, res) => {
  const { id_user } = req.params; // ID do usuário passado na URL

  try {
    // Buscar todos os pagamentos relacionados ao usuário
    const referenciasPagamento = await PaymentReference.findAll({
      where: { id_user }, // Filtrar pelo ID do usuário
      include: {
        model: Usuario,
        as: "usuario", // Incluir informações do usuário relacionadas
      },
    });

    // Verificar se há pagamentos para o usuário
    if (referenciasPagamento.length === 0) {
      return res.status(404).send({
        mensagem: "Nenhuma referência de pagamento encontrada para este usuário.",
      });
    }

    return res.status(200).send({
      mensagem: "Referências de pagamento encontradas.",
      dados: referenciasPagamento, // Retornar todos os dados
    });
  } catch (error) {
    console.error("Erro ao consultar todos os pagamentos: ", error); // Log para depuração
    return res.status(500).send({
      error: "Erro ao consultar todas as referências de pagamento.",
      detalhes: error.message,
    });
  }
};



const alterarStatusPagamento = async (req, res) => {
  const { id_pagamento } = req.params; // ID do pagamento passado na URL
  const { status_pago } = req.body; // Novo status passado no corpo da requisição

  try {
    const pagamento = await PaymentReference.findByPk(id_pagamento);

    if (!pagamento) {
      return res.status(404).send({
        mensagem: "Pagamento não encontrado.",
      });
    }

    pagamento.status_pago = status_pago;
    await pagamento.save();

    return res.status(200).send({
      mensagem: "Status do pagamento atualizado com sucesso.",
      pagamento,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Erro ao atualizar o status do pagamento.",
    });
  }
};




module.exports = {
  salvarReferenciaPagamento,
  consultarTodosPagamentos,
  criarPagamentoRecorrente,
  verificarPagamento,
  alterarStatusPagamento
};
