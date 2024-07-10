const http = require('http');
const app = require('./app')
require('dotenv').config()
const conn = require('./data/conn')
const port = process.env.PORT || 3000;
const server = http.createServer(app);

conn.sync().then(() => {
    server.listen(port);
    console.log('foi iniciado na porta: ' + port);
   }).catch((err) => console.error(err)); 

   //Para garantir que todos os processos do Node.js sejam encerrados quando o server é encerrado