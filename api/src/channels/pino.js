// Importo a função que avisa todos os
const {emit} = require('../configs/socket');

// Exportando as funções do pino
module.exports = {
    // Configuro o evento que avisará que um pino foi criado
    created()
    {
        // Emito o evento
        emit('pino:created');
    }
}
