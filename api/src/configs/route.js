// Importo o express
const {json} = require('express');

// Importo o cors
const cors = require('cors');

// Carregando o resovedor das paths
const {resolve} = require('path');

// Importo os controladores
const PinoController = require('../controllers/pino');
const PinoValorController = require('../controllers/pino_valor');
const EstadoController = require('../controllers/estado');

// Exporta as configurações das rotas
module.exports = {
    // Executa as configurações das rotas
    init(app)
    {
        // Configuro para a api aceitar json nas requisições
        app.use(json());

        // Configuro para a api aceitar cors
        app.use(cors());

        // Cadastro as rotas do controlador pino
        app.route('/pino')
            .get(PinoController.get)
            .post(PinoController.post)
            .delete(PinoController.delete);

        // Cadastro as rotas do controlador pino valor
        app.route('/pino_valor')
            .get(PinoValorController.get)
            .post(PinoValorController.post);

        app.route('/estado')
            .get(EstadoController.get);
    }
}
