<template>
  <div class="grid crud-demo">
    <div class="col-12">
      <div class="card">
        <Toast/>
        <Toolbar class="mb-4">
          <template v-slot:left>
            <div class="my-2">
              <Button class="p-button-success mr-2"
                      icon="pi pi-plus"
                      label="Novo"
                      @click="cadastrarNovo"/>
              <Button :disabled="!pinosSelecionados || !pinosSelecionados.length"
                      class="p-button-danger"
                      icon="pi pi-trash"
                      label="Excluir"
                      @click="confirmDeleteSelected"/>
            </div>
          </template>
        </Toolbar>

        <DataTable ref="dt"
                   v-model:selection="pinosSelecionados"
                   :filters="filtros"
                   :globalFilterFields="['pino','descricao','tipo']"
                   :loading="carregando"
                   :paginator="true"
                   :rows="10"
                   :rowsPerPageOptions="[5,10,25]"
                   :value="pinos"
                   currentPageReportTemplate="Mostrando de {first} até {last} de {totalRecords} Pinos"
                   dataKey="id"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   responsiveLayout="scroll">
          <template #header>
            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">Pinos</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText v-model="filtros['global'].value"
                           placeholder="Procurar por..."/>
              </span>
            </div>
          </template>
          <template #empty>
            Nenhum pino salvo
          </template>
          <template #loading>
            Carregando pinos, Aguarde...
          </template>
          <Column headerStyle="width: 3rem"
                  selectionMode="multiple"></Column>
          <Column :sortable="true"
                  field="pino"
                  header="Pino"/>
          <Column field="descricao"
                  header="Descrição"/>
          <Column :sortable="true"
                  field="tipo"
                  header="Tipo">
            <template #body="propsData">
              {{ tipos.find(tipo => tipo.value === propsData.data.tipo).label }}
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <Button class="p-button-rounded p-button-warning"
                      icon="pi pi-trash"
                      @click="confirmDeletePino(slotProps.data)"/>
            </template>
          </Column>
        </DataTable>

        <Dialog v-model:visible="pinoDialog"
                :modal="true"
                :style="{width: '450px'}"
                class="p-fluid"
                header="Novo pino">
          <div class="field">
            <label for="pino">Pino</label>
            <InputText id="pino"
                       v-model.trim="pino.pino"
                       :class="{'p-invalid': enviados && !pino.pino}"
                       autofocus
                       required="true"/>
            <small v-if="enviados && !pino.pino"
                   class="p-invalid">Pino é Obrigatório.</small>
          </div>

          <div class="field">
            <label for="descricao">Descrição</label>
            <Textarea id="descricao"
                      v-model.trim="pino.descricao"
                      cols="20"
                      rows="3"/>
          </div>

          <div class="field">
            <label class="mb-3"
                   for="tipo">Tipo</label>
            <Dropdown id="tipo"
                      v-model="pino.tipo"
                      :class="{'p-invalid': enviados && !pino.tipo}"
                      :options="tipos"
                      option-value="value"
                      optionLabel="label"
                      placeholder="Selecione um tipo"
                      required="true"/>
          </div>
          <template #footer>
            <Button class="p-button-text"
                    icon="pi pi-times"
                    label="Cancelar"
                    @click="apagarModal"/>
            <Button class="p-button-success"
                    icon="pi pi-check"
                    label="Salvar"
                    @click="salvarPino"/>
          </template>
        </Dialog>
        <Dialog v-model:visible="deletePinoDialog"
                :modal="true"
                :style="{width: '450px'}"
                header="Confirmação">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3"
               style="font-size: 2rem"/>
            <span v-if="pino">Deseja deletar o Pino <b>{{ pino.pino }}</b>?</span>
          </div>
          <template #footer>
            <Button class="p-button-text"
                    icon="pi pi-times"
                    label="Não"
                    @click="deletePinoDialog = false"/>
            <Button :loading="carregando"
                    class="p-button-success"
                    icon="pi pi-check"
                    label="Sim"
                    @click="deletePino"/>
          </template>
        </Dialog>
        <Dialog v-model:visible="deletePinosDialog"
                :modal="true"
                :style="{width: '450px'}"
                header="Confirmação">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3"
               style="font-size: 2rem"/>
            <span v-if="pino">Deseja deletar os pinos selecionados?</span>
          </div>
          <template #footer>
            <Button class="p-button-text"
                    icon="pi pi-times"
                    label="Não"
                    @click="deletePinosDialog = false"/>
            <Button :loading="carregando"
                    class="p-button-success"
                    icon="pi pi-check"
                    label="Sim"
                    @click="deleteSelectedProducts"/>
          </template>
        </Dialog>
      </div>
    </div>
  </div>

</template>

<script>
import PinoService from '../service/PinoService';
import {FilterMatchMode} from "primevue/api";

export default {
  data()
  {
    return {
      carregando: false,
      pinos: null,
      pinoDialog: false,
      deletePinoDialog: false,
      deletePinosDialog: false,
      pino: {},
      pinosSelecionados: null,
      filtros: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
      },
      enviados: false,
      tipos: [
        {label: 'Contador', value: 'contador'},
        {label: 'Binário', value: 'binario'},
        {label: 'Livre', value: 'livre'}
      ]
    }
  },
  pinoService: null,
  created()
  {
    this.pinoService = new PinoService();
  },
  mounted()
  {
    this.buscarPinos();
  },
  methods: {
    buscarPinos()
    {
      this.carregando = true;
      this.pinoService
          .buscarPinos()
          .then(data => this.pinos = data)
          .finally(() => this.carregando = false)
    },
    cadastrarNovo()
    {
      this.pino = {};
      this.enviados = false;
      this.pinoDialog = true;
    },
    apagarModal()
    {
      this.pinoDialog = false;
      this.enviados = false;
    },
    salvarPino()
    {
      this.enviados = true;
      if (this.pino.pino.trim() && this.pino.tipo)
      {
        this.carregando = true;
        this.pinoService
            .salvarPino(this.pino)
            .then(() =>
            {
              this.$toast
                  .add({severity: 'success', summary: 'Successful', detail: 'Pino criado', life: 3000});

              return this.buscarPinos();
            })
            .catch(() =>
            {
              this.$toast
                  .add({severity: 'error', summary: 'Error', detail: 'Falha ao inserir', life: 3000});
            })
            .finally(() =>
            {
              this.pinoDialog = false;
              this.deletePinoDialog = false;
              this.pino = {};
            })
      }
    },
    confirmDeletePino(pino)
    {
      this.pino = pino;
      this.deletePinoDialog = true;
    },
    deletePino()
    {
      this.carregando = true;
      this.pinoService
          .deletarPino(this.pino.pino)
          .then(() =>
          {
            this.$toast
                .add({severity: 'success', summary: 'Successful', detail: 'Pino deletado', life: 3000});

            return this.buscarPinos();
          })
          .finally(() =>
          {
            this.carregando = false;
            this.deletePinoDialog = false;
            this.pino = {};
          });
    },
    confirmDeleteSelected()
    {
      this.deletePinosDialog = true;
    },
    deleteSelectedProducts()
    {
      let pinosParaDeletar = this.pinosSelecionados.map(pinoParaDeletar =>
      {
        return this.pinoService
            .deletarPino(pinoParaDeletar.pino);
      });

      Promise.all(pinosParaDeletar)
          .then(() =>
          {
            this.$toast
                .add({severity: 'success', summary: 'Successful', detail: 'Pinos deletados', life: 3000});

            this.buscarPinos();
          })
          .finally(() =>
          {
            this.deletePinosDialog = false;
            this.pinosSelecionados = null;
          });
    }
  }
}
</script>

<style lang="scss"
       scoped>
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
</style>
