// Importo o express
const {json} = require('express');

// Carregando o resovedor das paths
const {resolve} = require('path');

// Importo os controladores
const PinoController = require('../controllers/pino');
const EstadoController = require('../controllers/estado');
const HomeController = require('../controllers/home');

// Exporta as configurações das rotas
module.exports = {
    // Executa as configurações das rotas
    init(app)
    {
        // Configuro para a api aceitar json nas requisições
        app.use(json());

        // Cadastro as rotas do controlador home
        app.route('/')
            .get(HomeController.index)

        // Cadastro as rotas do controlador pino
        app.route('/pino')
            .get(PinoController.get)
            .post(PinoController.post);

        app.route('/estado')
            .get(EstadoController.get);
    }
}
