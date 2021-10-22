// Carrega o repositorio
const PinoValorRepositorio = require('../repositories/pino_valor');

// Exportando as funções do estado
module.exports = {
    // Retorno todos os estados
    async get(req, res, next)
    {
        // Retorno todos os estados dos pinos salvos
        res.json(await PinoValorRepositorio.pinoPorEstado())
    },
}
