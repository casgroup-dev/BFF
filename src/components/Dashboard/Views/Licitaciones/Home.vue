<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Licitaciones
                <router-link :to="{ name: 'Nueva', query: {next: this.$route.query.next}}">
                  <a style="float: right; width: 250px"><i class="nc-icon nc-simple-add"></i></a>
                </router-link>
              </h4>
              <p class="card-category">Últimas licitaciones realizadas en la plataforma
                <router-link :to="{ name: 'Nueva', query: {next: this.$route.query.next}}">
                <a style="float: right; width: 250px">Nueva Licitación</a>
                </router-link>
              </p>
            </template>
            <template>
              <div class="row">
                <fg-input class="col-6" v-model="search" placeholder="Nombre Licitacion" addon-right-icon="nc-icon nc-zoom-split">
                </fg-input>
              </div>
            </template>
            <template>
            <div class="table-responsive">
              <table class="table table-hover table-striped">
                <thead>
                <th v-for="attr in table.columns">
                    <tr scope="col">{{attr}}</tr>
                </th>
                </thead>
                <tbody>
                <template v-for="licit in filteredLicitations">
                  <tr>
                    <td v-for="attr in licit.attributes">
                      <a
                        style="font-weight:normal; color:#262626;"
                        data-toggle="collapse"
                        role="button"
                        v-on:click="licit.show = !licit.show">
                        {{attr}}
                      </a>
                    </td>
                    <td><a
                      style="color:#262626;"
                      data-toggle="collapse"
                      role="button"
                      v-on:click="licit.show = !licit.show">
                      <i class="nc-icon nc-stre-down" v-if="!licit.show"></i>
                      <i class="nc-icon nc-stre-up" v-else></i>
                    </a></td>
                  </tr>
                  <transition name="slide" :duration="500">
                  <tr>
                    <td v-if="licit.show"> <!-- TODO Componentes de una Licitacion -->
                      <tr>Cronograma</tr> <!-- TODO Componente Propio -->
                      <tr>Bases</tr> <!-- TODO Componente Propio -->
                      <tr>Estado Licitación</tr>
                      <tr>Subir Documentos</tr> <!-- TODO Componente Propio -->
                      <tr>Preguntas/Respuestas</tr> <!-- TODO Componente Propio -->
                      <tr>Evaluaciones (Técnico, Comercial, Economico)</tr> <!-- TODO Componente Propio -->
                      <tr>Cuadro Comparativo</tr> <!-- TODO Componente Propio -->
                    </td>
                  </tr>
                  </transition>
                </template>
                </tbody>
              </table>
              <div class="row">
                <div class="col-12" style="text-align: center">
                  <button class="btn btn-center btn-info btn-round">Cargar más</button>
                </div>
              </div>
            </div>
            </template>
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
  // const tableData = Array(13).fill({
  //   attributes: {
  //     nombre: 'Snacks Copec de Rancagua',
  //     'fecha creación': '20 de Marzo de 2018',
  //     'última edición': '25 de Marzo de 2018',
  //     estado: 'Cerrada',
  //     etapa: 'Revisión',
  //   },
  //   show: false
  // })
  const tableData = [
    {
      attributes: {
        nombre: 'Snacks Copec de Rancagua',
        'fecha creación': '20 de Marzo de 2018',
        'última edición': '25 de Marzo de 2018',
        estado: 'Cerrada',
        etapa: 'Revisión',
      },
      show: false
    },
    {
      attributes: {
        nombre: 'Snacks Copec de Curico',
        'fecha creación': '20 de Marzo de 2018',
        'última edición': '25 de Marzo de 2018',
        estado: 'Cerrada',
        etapa: 'Revisión',
      },
      show: false
    }
  ]
  export default {
    components: {
      LTable,
      Card
    },
    methods: {
      displayLic(){

      }
    },
    data: function() {
      return {
        search: '',
        table: {
          columns: [...tableColumns],
          data: [...tableData]
        }
      }
    },
    computed:
      {
        filteredLicitations:function()
        {
          var self=this;
          return this.table.data.filter(function(cust){return cust.attributes.nombre.toLowerCase().indexOf(self.search.toLowerCase())>=0;});
          //return this.customers;
        }
      }
  }
</script>
<style>
</style>

