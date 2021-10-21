import axios from '../axios';

export default class PinoValorService
{
    buscarPinosValores()
    {
        return axios.get('pino_valor')
            .then(res => res.data);
    }
}
