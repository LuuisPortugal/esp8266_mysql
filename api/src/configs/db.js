// Importando o Mysql
const mysql = require("mysql2/promise");

// Variável para salvar a instancia do banco
let mysqlInstace = null;

// Exporta as configurações do banco
module.exports = {
    // Executa a conexão com o banco
    async connect()
    {
        // Verifica se a conexão já foi feita
        if (mysqlInstace && mysqlInstace.state !== 'disconnected')
        {
            // Se sim retorna ela
            return mysqlInstace;
        }

        // Se não, cria uma nova e salva
        mysqlInstace = await mysql.createConnection("mysql://root:esp8266_mysql_secret@127.0.0.1:3306/esp8266_mysql");

        // Aviso da conexão com o banco
        console.log("Database conectado")

        // Retorna ela
        return mysqlInstace;
    }
}
