// Carrega o repositorio
const PinoRepositorio = require('../repositories/pino');

// Carrega os eventos do pino
const {created: createdPinoEvent} = require('../channels/pino')

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
        let {pino, estado} = req.body;

        // Salvo o pino no banco de dados
        await PinoRepositorio
            .create(pino, estado);

        // Aviso todos os clientes de socket da criação
        createdPinoEvent();

        // Retorno o status de ok
        res
            .status(201)
            .end();
    }
}
