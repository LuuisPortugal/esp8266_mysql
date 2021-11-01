// Importando o Mysql
const mysql = require("mysql2/promise");

// Importa o Fs
const fs = require('fs');

// Importa o path
const {resolve} = require('path');

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
        mysqlInstace = await mysql.createConnection(process.env.DB_URI);

        // Aviso da conexão com o banco
        console.log("Database conectado");

        // Cria o banco e tabelas caso não tenha sido criado
        let dbPath = resolve(__dirname, "database", "script.sql"); 
        let db = fs.readFileSync(dbPath, 'utf8');
        mysqlInstace.beginTransaction()
            .then(() => {
                mysqlInstace.execute(db);
                mysqlInstace.commit();
            })
            .catch(err => console.log(err))

        // Retorna ela
        return mysqlInstace;
    }
}
