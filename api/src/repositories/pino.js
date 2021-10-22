// Carrega a conexão com o banco
const {connect} = require('../configs/db')

// Exporta os repositórios do pino
module.exports = {
    // Carrego todos os pinos
    async all()
    {
        // Carrego a conexão com o banco
        const db = await connect();

        // Seleciono todas as linhas da tabela
        let [rows] = await db
            .query('SELECT * FROM pinos ORDER BY id DESC');

        // Retorno todas as linhas
        return rows;
    },
    // Insiro uma nova linha no banco
    async create(pino, descricao, tipo)
    {
        // Carrego a conexão com o banco
        const db = await connect();

        // Monsto a query para inserir o pino
        const sql = 'INSERT INTO pinos (pino, descricao, tipo) VALUES (?,?,?)';
        const values = [pino, descricao, tipo];

        // Salvo o novo valor no banco
        return await db.query(sql, values);
    },
    // deleto uma nova linha no banco
    async delete(pino)
    {
        // Carrego a conexão com o banco
        const db = await connect();

        // Monsto a query para deletar o pino
        const sqlPinoValor = 'DELETE FROM pinos_valores WHERE pino = ?';
        const sqlPino = 'DELETE FROM pinos WHERE pino = ?';
        const values = [pino];

        // Deleta o valor no banco
        return await db.query(sqlPinoValor, values) && await db.query(sqlPino, values);
    },
}
