import axios from '../axios';

export default class EstadoService
{
    buscarEstados()
    {
        return axios.get('estado')
            .then(res => res.data);
    }
}
