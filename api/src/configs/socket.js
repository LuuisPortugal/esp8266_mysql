// Carrega os canais de socket
const PinoChannels = require('../channels/pino');

// Variável para salvar os sockets
const sockets = [];

// Exporta as configurações do socket
module.exports = {
    // Executa as configurações dos sockets
    init(io)
    {
        // Verifica sempre que há uma nova conexão
        io.on('connection', socket =>
        {
            // Salva ele para ouvir os outros eventos
            sockets.push(socket);

            // Alerto do socket connectado
            console.log('Socket conectado', socket.id);

            // Verifica quandoo socket se desconectar
            socket.on('disconnect', () =>
            {
                // Carrego o index
                let indexSocket = sockets.indexOf(socket);

                // Removo ele dos socket salvos
                sockets.splice(indexSocket, 1);

                // Alerto do socket desconnectado
                console.log('Socket desconectado', socket.id);
            })
        });
    },
    // Salva um evento para os outros sockets ouvirem
    emit(channel, payload)
    {
        // Digo para todos os sockets
        sockets.map(socket =>
        {
            // Emitirem o evento
            socket.emit(channel, payload);
        })
    }
}
