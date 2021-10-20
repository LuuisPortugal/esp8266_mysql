// Carrega o repositorio
const PinoRepositorio = require('../repositories/pino');

// Exportando as funções do estado
module.exports = {
    // Retorno todos os estados
    async get(req, res, next)
    {
        // Retorno todos os estados dos pinos salvos
        res.json(await PinoRepositorio.pinoPorEstado())
    },
}
