<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Proveedores
                <router-link :to="{ name: 'Nueva', query: {next: this.$route.query.next}}">
                  <a style="float: right; width: 250px"><i class="nc-icon nc-simple-add"></i></a>
                </router-link>
              </h4>
              <p class="card-category">Actuales proveedores disponibles para CasGroup
                <router-link :to="{ name: 'Nueva', query: {next: this.$route.query.next}}">
                  <a style="float: right; width: 250px">Agregar Proveedor</a>
                </router-link>
              </p>
            </template>
            <template>
              <div class="row">
                <fg-input class="col-6" v-model="search" placeholder="Industria"
                          addon-right-icon="nc-icon nc-zoom-split">
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
                  <template v-for="provider in filteredProviders">
                    <tr>
                      <td v-for="attr in provider.attributes">
                        <a
                          style="font-weight:normal; color:#262626;"
                          data-toggle="collapse"
                          role="button"
                          v-on:click="provider.show = !provider.show">
                          {{attr}}
                        </a>
                      </td>
                      <td>
                        <i class="nc-icon nc-check-2" v-if="provider.active"></i>
                        <i class="nc-icon nc-simple-remove" v-else></i>
                      </td>
                      <td><a
                        style="color:#262626;"
                        data-toggle="collapse"
                        role="button"
                        v-on:click="provider.show = !provider.show">
                        <i class="nc-icon nc-stre-down" v-if="!provider.show"></i>
                        <i class="nc-icon nc-stre-up" v-else></i>
                      </a></td>
                    </tr>
                    <transition name="fade" mode="out-in" appear>
                      <tr>
                        <td v-if="provider.show"> <!-- TODO Componentes de una Licitacion -->
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

  const tableColumns = [
    'Nombre Fantasia',
    'Nombre Legal',
    'Industria',
    'Rut',
    'Dirección',
    'Ciudad',
    'Pais',
    'Telefono',
    'Pagina Web',
    'Contacto Comercial',
    'Activo'
  ]
  // const tableData = Array(13).fill({
  //   attributes: {
  //     nombre_fantasia: 'souto',
  //     nombre_legal: 'sut',
  //     active: true,
  //     RUT: '12.345.678-9',
  //     direccion: 'calle falsa 123',
  //     ciudad: 'Talagante',
  //     pais: 'Chile',
  //     fono: '+569 999 888 21',
  //     web: '-',
  //     contacto: 'a@a.a'
  //   },
  //   show: false
  // })
  const tableData = [
    {
      attributes: {
        nombre_fantasia: 'souto',
        nombre_legal: 'sut',
        industria: 'telecomunicaciones',
        RUT: '12.345.678-9',
        direccion: 'calle falsa 123',
        ciudad: 'Talagante',
        pais: 'Chile',
        fono: '+569 999 888 21',
        web: '-',
        contacto: 'a@a.a'
      },
      active: true,
      show: false
    },
    {
      attributes: {
        nombre_fantasia: 'perry',
        nombre_legal: 'porry',
        industria: 'transporte',
        RUT: '69.426.942-9',
        direccion: 'avenida siempre viva 78',
        ciudad: 'Springfield',
        pais: 'US',
        fono: '+569 555 666 77',
        web: '-',
        contacto: 'b@b.b'
      },
      active: false,
      show: false
    }
  ]
  export default {
    components: {
      LTable,
      Card
    },
    methods: {},
    data: function () {
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
        filteredProviders: function () {
          const self = this
          return this.table.data.filter(function (prov) {
            return prov.attributes.industria.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
          })
        }
      }
  }
</script>
<style scoped src="../../../../assets/css/animations/fade.css">
</style>

