<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <div class="row">
                <div class="offset-3 col-6" style="text-align: center; font-size: xx-large">
                  Proveedores
                </div>
                <div class="col-3" style="text-align: right; font-size: xx-large">
                  <button class="btn btn-primary" style="font-size: large" @click="provider.modalOn = true">
                    Agregar proveedor
                  </button>
                </div>
              </div>
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

    <div v-if="provider.success" style="text-align: center">
      <notifications></notifications>
    </div>


    <modal v-if="provider.modalOn">
      <template slot="header">
        <label>Registre a un nuevo proveedor</label>
      </template>
      <template slot="body">
        <label class="error" v-if="provider.error">{{provider.errorMessage}}</label>
        <label class="error" v-if="provider.name.error">{{provider.name.errorMessage}}</label>
        <fg-input placeholder="Nombre Proveedor" v-model="provider.name.payload"></fg-input>
        <label class="error" v-if="provider.mail.error">{{provider.mail.errorMessage}}</label>
        <fg-input placeholder="proveedor@suempresa.cl" v-model="provider.mail.payload"></fg-input>
        <label class="error" v-if="provider.rut.error">{{provider.rut.errorMessage}}</label>
        <fg-input placeholder="RUT Empresa Proveedor" v-model="provider.rut.payload"></fg-input>
      </template>
      <template slot="footer">

        <clip-loader :loading="provider.loading" color="#5D8EF9"/>
        <button class="btn btn-primary" v-if="!provider.loading" @click="addProvider">
          Autorizar proveedor
        </button>
        <button class="btn btn-primary" v-if="!provider.loading" @click="cancelModal">
          Cancelar
        </button>
      </template>
    </modal>
  </div>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import Modal from 'src/components/UIComponents/Modal/Modal.vue'
  import ClipLoader from 'vue-spinner/src/ClipLoader'
  import usersApi from 'src/apis/users'
  import VueNotify from 'vue-notifyjs'

  const tableColumns = [
    'Razón social',
    'Nombre fantasia',
    'Rut',
    'Rubros',
    'Representante Legal',
    'Email Representante Legal',
    'Telefono Representante Legal',
    'Usuarios',
    'Activo'
  ]

  //TODO:Returns a Promise, fix to return companies and call this.companiesToTable

  export default {
    components: {
      LTable,
      Card,
      Modal,
      ClipLoader,
      VueNotify
    },
    methods: {
      addProvider: function () {
        if (!this.provider.mail.payload) {
          this.provider.mail.error = true
          this.provider.mail.errorMessage = 'El email es obligatorio'
        } else {
          const self = this
          self.provider.loading = true
          usersApi.registerProvider(
            this.provider.name.payload,
            this.provider.rut.payload,
            this.provider.mail.payload
          )
            .then(function () {
              self.cancelModal()
              self.provider.success = true
              self.addNotification()
            })
            .catch(function (err) {
              // TODO: Manage messages per type of error
              self.provider.error = true
              self.provider.errorMessage = 'Este proveedor ya existe en el sistema'
            })
            .then(function () {
              self.provider.loading = false
              self.provider.success = true
            })
        }
      },

      companiesToTable: function (companies) {
        return companies.map(company => {
          return {
            'attributes': {
              'businessName': company['businessName'],
              'fantasyName': company['fantasyName'],
              'rut': company['rut'],
              'industries': company['industries'].join(', '),
              'legalRepresentative': company['legalRepresentative'],
              'legalRepEmail': company['legalRepEmail'],
              'legalRepPhone': company['legalRepPhone'],
              'users': company['users'].map(user => user.name).join(', ')
            },
            'active': true,
            'show': false
          }
        })
      },

      cancelModal: function () {
        this.provider.modalOn = false
        this.provider.name.payload =
          this.provider.rut.payload =
            this.provider.mail.payload = ''
        this.provider.error =
          this.provider.name.error =
            this.provider.rut.error =
              this.provider.mail.error = false
      },

      addNotification: function () {
        this.$notify({
          message: 'Proveedor autorizado exitosamente!',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'success'
        })
      }

    },
    data: function () {
      return {
        search: '',
        table: {
          columns: [...tableColumns],
          data: []
        },
        provider: {
          name: {
            payload: '',
            error: false,
            errorMessage: ''
          },
          rut: {
            payload: '',
            error: false,
            errorMessage: ''
          },
          mail: {
            payload: '',
            error: false,
            errorMessage: ''
          },
          /* error: false,
          errorMessage: '', */
          modalOn: false,
          loading: false,
          success: false
        }
      }
    },
    created: function () {
      const self = this
      usersApi.getCompanies().then(data => {
        const temp = data
        self.table.data = self.companiesToTable(temp)
        console.log(self.table.data)
      })
    },
    computed:
      {
        filteredProviders: function () {
          var self = this
          return this.table.data.filter(function (prov) {
            return prov.attributes.businessName.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
          })
        }
      }
  }

</script>
<style scoped src="../../../../assets/css/animations/fade.css">
</style>

<style scoped>
  label.error {
    color: #ff0000
  }

</style>
