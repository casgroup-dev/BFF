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
                  <transition name="fade" mode="out-in" appear>
                    <router-link :to="{ name: 'NewLicit', query: {next: this.$route.query.next}}">
                      <button class="btn btn-primary">
                        Nueva Licitación
                      </button>
                    </router-link>
                  </transition>
                </div>
              </div>
            </template>
            <search-bar v-model="search" placeholder="Buscar por nombre" style="margin-bottom: 10px;"></search-bar>
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
                </tr>
                </tbody>
              </table>
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
  import usersApi from 'src/apis/users'
  import SearchBar from 'src/components/UIComponents/Inputs/SearchBar.vue'

  export default {
    components: {
      LTable,
      Card,
      SearchBar
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
              'Etapa'
            ]
          },
          data: []
        }
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
          // return this.customers
      }
    }
  }
</script>
<style>
</style>

