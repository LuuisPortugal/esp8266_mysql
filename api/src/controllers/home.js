// Carregando o resovedor das paths
const {resolve} = require('path');

// Exportando as funções do home
module.exports = {
    // Executando a página principal
    index(req, res, next)
    {
        // Retornando a view home
        res.sendFile(resolve(__dirname, "..", "views", "home.html"));
    }
}
