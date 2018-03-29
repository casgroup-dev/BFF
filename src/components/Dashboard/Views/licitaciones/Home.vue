<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Licitaciones</h4>
              <p class="card-category">Últimas licitaciones realizadas en la plataforma</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover table-striped"
                       :columns="table.columns"
                       :data="table.data">
              </l-table>
              <div class="row">
                <div class="col-12" style="text-align: center">
                  <button class="btn btn-center btn-info btn-round">Cargar más</button>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  const tableColumns = ['Nombre', 'Fecha creación', 'Última edición', 'Estado', 'Etapa']
  const tableData = Array(13).fill({
    nombre: 'Snacks Copec de Rancagua',
    'fecha creación': '20 de Marzo de 2018',
    'última edición': '25 de Marzo de 2018',
    estado: 'Cerrada',
    etapa: 'Revisión'
  })
  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        table: {
          columns: [...tableColumns],
          data: [...tableData]
        }
      }
    }
  }
</script>
<style>
</style>

