<template>
  <div class="grid">
    <div v-for="estado in estados"
         :key="estado.pino"
         class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">{{ estado.descricao || 'Pino ' + estado.pino }}</span>
            <div class="text-900 font-medium text-xl">{{ formatValor(estado) }}</div>
          </div>
          <div :class="formatTipoBg(estado)"
               class="flex align-items-center justify-content-center border-round"
               style="width:2.5rem;height:2.5rem">
            <i :class="formatTipo(estado)"
               class="pi text-white text-xl"></i>
          </div>
        </div>
        <span class="text-500">Última atualização </span>
        <span class="text-500 font-medium">{{ formatMoment(estado.horario) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import EstadoService from '../service/EstadoService';
import moment from "moment";
import socket from '../socket';

moment.locale('pt-br')

export default {
  data()
  {
    return {
      estados: null
    }
  },
  estadoService: null,
  created()
  {
    this.estadoService = new EstadoService();
  },
  mounted()
  {
    this.buscarEstados();

    socket.on('pino:criado', this.buscarEstados);
    socket.on('pino:deletado', this.buscarEstados);
    socket.on('pino_valor:criado', this.buscarEstados);
  },
  unmounted()
  {
    socket.off('pino:criado');
    socket.off('pino:deletado');
    socket.off('pino_valor:criado');
  },
  methods: {
    buscarEstados()
    {
      this.estadoService
          .buscarEstados()
          .then(estados => this.estados = estados);
    },
    formatMoment(horario)
    {
      return moment(horario).fromNow();
    },
    formatTipo(estado)
    {
      switch (estado.tipo)
      {
        case 'contador':
          return 'pi-sort-numeric-up-alt';
        case 'binario':
          return 'pi-power-off';
        default:
          return 'pi-pencil';
      }
    },
    formatTipoBg(estado)
    {
      switch (estado.tipo)
      {
        case 'contador':
          return 'bg-blue-500';
        case 'binario':
          return estado.valor === "true"
              ? 'bg-yellow-500'
              : 'bg-gray-500';
        default:
          return 'bg-green-500';
      }
    },
    formatValor(estado)
    {
      switch (estado.tipo)
      {
        case 'binario':
          return estado.valor === 'true'
              ? 'Ligado'
              : 'Desligado';
        default:
          return estado.valor;
      }
    }
  }
}
</script>
