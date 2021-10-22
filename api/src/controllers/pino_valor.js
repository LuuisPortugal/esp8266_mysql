// Carrega o repositorio
const PinoValorRepositorio = require('../repositories/pino_valor');

// Carrega os eventos do valor do pino
const {criado: eventoPinoValorCriado} = require('../channels/pino_valor')

// Exportando as funções do valor do pino
module.exports = {
    // Retorno todos os valores dos pinos
    async get(req, res, next)
    {
        // Retorno todos os valores dos pinos salvos
        res.json(await PinoValorRepositorio.all())
    },
    // Crio o valor do pino no banco de dados
    async post(req, res, next)
    {
        // Carrego o novo valor do pino para salvar
        let {pino, valor} = req.body;

        // Salvo o valor do pino no banco de dados
        await PinoValorRepositorio
            .create(pino, valor);

        // Aviso todos os clientes de socket da criação
        eventoPinoValorCriado();

        // Retorno o status de ok
        res
            .status(201)
            .end();
    }
}
