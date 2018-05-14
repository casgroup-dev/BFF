<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Licitaciones
                <router-link :to="{ name: 'NewLicit', query: {next: this.$route.query.next}}">
                  <a style="float: right; width: 250px"><i class="nc-icon nc-simple-add"></i></a>
                </router-link>
              </h4>
              <p class="card-category">Últimas licitaciones realizadas en la plataforma
                <router-link :to="{ name: 'NewLicit', query: {next: this.$route.query.next}}">
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
                <thead class="thead-light">
                <tr>
                  <th v-for="attr in table.columns" scope="col">{{attr}}</th>
                </tr>
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
                    <td class="align-center">
                      <router-link :to="{ name: 'licitacion'}">
                        <button class="btn btn-default btn-sm">
                          Entrar
                        </button>
                      </router-link>
                    </td>
                    <!--<td><a
                      style="color:#262626;"
                      data-toggle="collapse"
                      role="button"
                      v-on:click="licit.show = !licit.show">
                      <i class="nc-icon nc-stre-down" v-if="!licit.show"></i>
                      <i class="nc-icon nc-stre-up" v-else></i>
                    </a></td>-->
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
  import usersApi from 'src/apis/users'

  export default {
    components: {
      LTable,
      Card
    },
    methods: {
      biddingsToTable: function (biddings) {
        return biddings.map(bidding => {
          return {
            attributes: {
              name: bidding.attributes['name'],
              creationDate: bidding.attributes['creationDate'],
              lastEdition: bidding.attributes['lastEdition'],
              state: bidding.attributes['state'],
              stage: bidding.attributes['stage']
            },
            show: bidding['show']
          }
        })
      },
    },
    data: function() {
      return {
        search: '',
        table: {
          columns: ['Nombre', 'Cliente', 'Etapa', '', ''],
          data: []
        }
      }
    },
    created: function () {
      const self = this
      usersApi.getBiddings().then(data => {
        self.table.data = self.biddingsToTable(data)
      }).catch(err => {
        console.error(err)
        /* The user is not authorized to access here */
        self.$router.push('/')
      })
    },
    computed: {
      filteredLicitations: function () {
        var self = this
        return this.table.data.filter(function(licit){return licit.attributes.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
        })
      }
    }
  }
</script>
<style>
</style>

