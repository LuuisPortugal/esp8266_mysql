<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <DataTable v-model:filters="filtro"
                   :filters="filtro"
                   :globalFilterFields="['pino','horario','valor']"
                   :loading="carregando"
                   :paginator="true"
                   :rowHover="true"
                   :rows="10"
                   :value="pinos_valores"
                   dataKey="id"
                   filterDisplay="menu"
                   responsiveLayout="scroll">

          <template #header>
            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">Valores</h5>
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search"/>
                <InputText v-model="filtro['global'].value"
                           placeholder="Pesquisar por..."
                           style="width: 100%"/>
              </span>
            </div>
          </template>
          <template #empty>
            Nenhum valor salvo
          </template>
          <template #loading>
            Carregando valores, Aguarde...
          </template>
          <Column :sortable="true"
                  field="pino"
                  header="Pino"/>
          <Column :sortable="true"
                  field="horario"
                  header="Horário">
            <template #body="{data}">
              {{ formatDate(data.horario) }}
            </template>
          </Column>
          <Column field="valor"
                  header="Valor"/>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import PinoValorService from '../service/PinoValorService';
import {FilterMatchMode} from "primevue/api";

import socket from '../socket';

export default {
  data()
  {
    return {
      filtro: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
      },
      carregando: true,
      pinos_valores: null
    }
  },
  pinoValorService: null,
  created()
  {
    this.pinoValorService = new PinoValorService();
  },
  mounted()
  {
    this.buscarPinosValores();

    socket.on('pino_valor:criado', () => this.buscarPinosValores(true));
  },
  unmounted()
  {
    socket.off('pino_valor:criado');
  },
  methods: {
    buscarPinosValores(fromSocket = false)
    {
      if (!fromSocket)
      {
        this.carregando = true;
      }

      this.pinoValorService
          .buscarPinosValores()
          .then(pinosValores => this.pinos_valores = pinosValores)
          .finally(() => this.carregando = false);
    },
    formatDate(value)
    {
      return new Date(value).toLocaleString();
    },
  }
}
</script>

<style lang="scss"
       scoped>
.customer-badge {
  border-radius: 2px;
  padding: .25em .5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .3px;

  &.status-qualified {
    background: #C8E6C9;
    color: #256029;
  }

  &.status-unqualified {
    background: #FFCDD2;
    color: #C63737;
  }

  &.status-negotiation {
    background: #FEEDAF;
    color: #8A5340;
  }

  &.status-new {
    background: #B3E5FC;
    color: #23547B;
  }

  &.status-renewal {
    background: #ECCFFF;
    color: #694382;
  }

  &.status-proposal {
    background: #FFD8B2;
    color: #805B36;
  }
}

.product-badge {
  border-radius: 2px;
  padding: .25em .5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .3px;

  &.status-instock {
    background: #C8E6C9;
    color: #256029;
  }

  &.status-outofstock {
    background: #FFCDD2;
    color: #C63737;
  }

  &.status-lowstock {
    background: #FEEDAF;
    color: #8A5340;
  }
}

.order-badge {
  border-radius: 2px;
  padding: .25em .5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .3px;

  &.order-delivered {
    background: #C8E6C9;
    color: #256029;
  }

  &.order-cancelled {
    background: #FFCDD2;
    color: #C63737;
  }

  &.order-pending {
    background: #FEEDAF;
    color: #8A5340;
  }

  &.order-returned {
    background: #ECCFFF;
    color: #694382;
  }
}

</style>
