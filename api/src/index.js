// Carrega a aplicação
const app = require('express')();

// Cria o servidor web
const http = require('http').Server(app);

// Cria o servidor socket
const io = require('socket.io')(http, {cors: {origins: '*:*'}});

// Carrego as variáveis
const dotenv = require('dotenv');
const {resolve} = require('path');
dotenv.config({path: resolve(__dirname, '..', '.env')});

// Registra as rotas do servidor
require('./configs/route')
    .init(app);

// Registra os canais de socket
require('./configs/socket')
    .init(io);

// inicia o servidor
http.listen(3000,
    () => console.log('Servidor iniciado'));
