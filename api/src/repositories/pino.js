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
            .query('SELECT * FROM pinos ORDER BY horario DESC');

        // Retorno todas as linhas
        return rows;
    },
    // Insiro uma nova linha no banco
    async create(pino, estado)
    {
        // Carrego a conexão com o banco
        const db = await connect();

        // Monsto a query para inserir o pino
        const sql = 'INSERT INTO pinos(pino, horario, estado) VALUES (?,?,?)';
        const values = [pino, new Date(), estado];

        // Salvo o novo valor no banco
        return await db.query(sql, values);
    },
    // Carrego todos os pinos pelo seu estado
    async pinoPorEstado()
    {
        // Carrego a conexão com o banco
        const db = await connect();

        // Seleciono todas as linhas da tabela pelo estado
        let [rows] = await db
            .query('SELECT p.* ' +
                'FROM pinos p, ' +
                '     ( ' +
                '         SELECT pino, max(horario) AS ultimo_horario ' +
                '         FROM pinos ' +
                '         GROUP BY pino ' +
                '     ) pp ' +
                'WHERE p.pino = pp.pino ' +
                '  AND p.horario = pp.ultimo_horario ' +
                'ORDER BY p.horario DESC');

        // Retorno todas as linhas
        return rows;
    }
}
