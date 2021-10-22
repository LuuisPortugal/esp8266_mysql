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
            .query('SELECT * FROM pinos_valores ORDER BY horario DESC');

        // Retorno todas as linhas
        return rows;
    },
    // Insiro uma nova linha no banco
    async create(pino, valor)
    {
        // Carrego a conexão com o banco
        const db = await connect();

        // Monsto a query para inserir o pino
        const sql = 'INSERT INTO pinos_valores (pino, horario, valor) VALUES (?,?,?)';
        const values = [pino, new Date(), valor];

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
            .query('SELECT p.pino,\n' +
                '       p.descricao,\n' +
                '       p.tipo,\n' +
                '       pv.horario,\n' +
                '       case\n' +
                '           when p.tipo = \'contador\'\n' +
                '               then (select count(1) from pinos_valores pvs where pvs.pino = p.pino)\n' +
                '           else pv.valor\n' +
                '       end as valor\n' +
                'FROM pinos p,\n' +
                '     pinos_valores pv,\n' +
                '     (\n' +
                '         SELECT pino, max(horario) AS ultimo_horario\n' +
                '         FROM pinos_valores\n' +
                '         GROUP BY pino\n' +
                '     ) pp\n' +
                'WHERE p.pino = pv.pino\n' +
                '  AND pv.pino = pp.pino\n' +
                '  AND pv.horario = pp.ultimo_horario\n' +
                'ORDER BY pv.pino DESC\n');

        // Retorno todas as linhas
        return rows;
    }
}
