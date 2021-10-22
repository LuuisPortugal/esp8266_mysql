// Importo a função que avisa todos os
const {emit} = require('../configs/socket');

// Exportando as funções do pino valor
module.exports = {
    // Configuro o evento que avisará que um valor do pino foi criado
    criado()
    {
        // Emito o evento
        emit('pino_valor:criado');
    }
}
