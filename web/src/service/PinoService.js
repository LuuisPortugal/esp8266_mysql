import axios from '../axios';

export default class PinoService
{
    buscarPinos()
    {
        return axios.get('pino')
            .then(res => res.data);
    }

    salvarPino(pino)
    {
        return axios.post('pino', pino)
            .then(res => res.data);
    }

    deletarPino(pino)
    {
        return axios.delete('pino', {params: {pino}})
            .then(res => res.data);
    }
}
