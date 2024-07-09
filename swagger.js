const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API Zonu',
      version: '1.0.0',
      description: 'Documentação completa da plataforma Zonu.',
    },
    servers: [
      {
        url: 'https://www.zonu.com.br/api',
        description: 'Servidor de Produção',
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    // Caminho para os arquivos das rotas
    apis: ['./routes/*.js'], 
  };
  
  const swaggerSpec = require('swagger-jsdoc')(options);
  
  module.exports = swaggerSpec;
  