<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <div class="row">
                <!-- TITLE -->
                <div class="col-4 offset-4" style="text-align: center; font-size: xx-large">Licitaciones</div>
                <!-- BUTTONS -->
                <div class="col-4" style="text-align: right; font-size: xx-large">
                  <!-- NEW BIDDING -->
                  <button class="btn btn-primary" @click="modalOn = true">Nueva Licitación</button>
                </div>
              </div>
            </template>
            <search-bar v-model="search" placeholder="Buscar por nombre" style="margin-bottom: 10px;"/>
            <!-- TABLE WITH BIDDINGS -->
            <div class="table-responsive">
              <table class="table table-hover table-striped">
                <!-- HEADERS -->
                <thead class="thead-light">
                <tr>
                  <th v-for="(attr, index) in table.columns.attributes" :key="index" scope="col">{{attr}}</th>
                </tr>
                </thead>
                <!-- BODY -->
                <tbody>
                <tr v-for="(licit, index) in filteredLicitations" :key="index">
                  <td v-for="(attr, index) in licit.attributes" :key="index">
                    <a style="font-weight:normal; color:#262626;">{{attr}}</a>
                  </td>
                  <td class="align-center">
                    <router-link :to="{ name: 'licitacion'}">
                      <button class="btn btn-default btn-sm">
                        Entrar
                      </button>
                    </router-link>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>
    </div>
    <modal v-if="modalOn">
      <template slot="header">
        <h4 style="margin: 0">Nueva Licitación</h4>
        <button type="button" class="btn btn-round btn-default btn-sm" @click="modalOn = false">
          <span class="btn-label"><i class="fa fa-times"></i></span> Cerrar
        </button>
      </template>
      <template slot="body">
        <create-form v-on:endModal="modalOn = false" :buttonCaption="'Crear'"></create-form>
      </template>
    </modal>
  </div>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import usersApi from 'src/api/index'
  import SearchBar from 'src/components/UIComponents/Inputs/SearchBar.vue'
  import CreateForm from 'src/components/Dashboard/Views/Licitaciones/CreateForm.vue'
  import Modal from 'src/components/UIComponents/Modal/Modal.vue'

  export default {
    components: {
      LTable,
      Card,
      SearchBar,
      CreateForm,
      Modal
    },
    /* DATA OF THE COMPONENT */
    data: function () {
      return {
        search: '',
        table: {
          columns: {
            attributes: [
              'Nombre',
              'Cliente',
              'Etapa',
              ''
            ]
          },
          data: []
        },
        modalOn: false
      }
    },
    /* METHODS OF THE COMPONENTS */
    methods: {
      biddingsToTable: function (biddings) {
        return biddings.map(bidding => {
          return {
            attributes: {
              name: bidding.attributes['name'],
              client: bidding.attributes['client'],
              currentStage: bidding.attributes['currentStage']
            },
            show: bidding['show']
          }
        })
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
        const self = this
        return this.table.data.filter(function (licit) { return licit.attributes.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 })
      }
    }
  }
</script>
<style>
</style>

