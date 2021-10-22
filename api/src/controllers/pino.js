// Carrega o repositorio
const PinoRepositorio = require('../repositories/pino');

// Carrega os eventos do pino
const {criado: eventoPinoCriado, deletado: eventoPinoDeletado} = require('../channels/pino')

// Exportando as funções do pino
module.exports = {
    // Retorno todos os pinos
    async get(req, res, next)
    {
        // Retorno todos os pinos salvos
        res.json(await PinoRepositorio.all())
    },
    // Crio o pino no banco de dados
    async post(req, res, next)
    {
        // Carrego o novo pino para salvar
        let {pino, descricao, tipo} = req.body;

        // Salvo o pino no banco de dados
        await PinoRepositorio
            .create(pino, descricao, tipo);

        // Aviso todos os clientes de socket da criação
        eventoPinoCriado();

        // Retorno o status de ok
        res
            .status(201)
            .end();
    },
    // deletp o pino no banco de dados
    async delete(req, res, next)
    {
        // Carrego o pino para deletar
        let {pino} = req.query;

        // deleto o pino no banco de dados
        await PinoRepositorio
            .delete(pino);

        // Aviso todos os clientes de socket da exclusao
        eventoPinoDeletado();

        // Retorno o status de ok
        res
            .status(200)
            .end();
    }
}
