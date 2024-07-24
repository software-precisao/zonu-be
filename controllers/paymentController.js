const TokenPayment = require("../models/tb_token_payment");

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

module.exports = {
  criarPagamentoRecorrente,
  verificarPagamento,
};
