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
                <fg-input class="col-6" v-model="search" placeholder="Proveedor"
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
                  <template v-for="licit in filteredProviders">
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
                    <transition name="fade" mode="out-in" appear>
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
    <modal v-if="provider.modalOn">
      <template slot="header">
        <label>Registre a un nuevo proveedor</label>
      </template>
      <template slot="body">
        <label class="error" v-if="provider.name.error">{{provider.name.errorMessage}}</label>
        <fg-input placeholder="Nombre Proveedor" v-model="provider.name.payload"></fg-input>
        <label class="error" v-if="provider.mail.error">{{provider.mail.errorMessage}}</label>
        <fg-input placeholder="proveedor@suempresa.cl" v-model="provider.mail.payload"></fg-input>
        <label class="error" v-if="provider.rut.error">{{provider.rut.errorMessage}}</label>
        <fg-input placeholder="RUT Empresa Proveedor" v-model="provider.rut.payload"></fg-input>
      </template>
      <template slot="footer">
        <label class="error" v-if="provider.error">{{provider.errorMessage}}</label>
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

  const tableColumns = [
    'Nombre fantasia',
    'Razón social',
    'Industria',
    'Activo',
    'Rut',
    'Dirección',
    'Ciudad',
    'Pais',
    'Teléfono',
    'Página web',
    'Contacto comercial'
  ]
  const tableData = [
    {
      attributes: {
        nombre_fantasia: 'souto',
        nombre_legal: 'sut',
        industria: 'telecomunicaciones',
        active: true,
        RUT: '12.345.678-9',
        direccion: 'calle falsa 123',
        ciudad: 'Talagante',
        pais: 'Chile',
        fono: '+569 999 888 21',
        web: '-',
        contacto: 'a@a.a'
      },
      show: false
    },
    {
      attributes: {
        nombre_fantasia: 'perry',
        nombre_legal: 'porry',
        industria: 'transporte',
        active: false,
        RUT: '69.426.942-9',
        direccion: 'avenida siempre viva 78',
        ciudad: 'Springfield',
        pais: 'US',
        fono: '+569 555 666 77',
        web: '-',
        contacto: 'b@b.b'
      },
      show: false
    }
  ]
  export default {
    components: {
      LTable,
      Card,
      Modal,
      ClipLoader
    },
    methods: {
      addProvider: function () {
        this.provider.mail.error =
          this.provider.name.error =
            this.provider.rut.error =
              this.provider.error = false
        if (this.provider.mail.payload === '') {
          this.provider.mail.error = true
          this.provider.mail.errorMessage = 'Este campo es obligatorio'
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
            })
            .catch(function (err) {
              self.provider.error = true
              self.provider.errorMessage = 'Este proveedor ya existe en el sistema'
            })
            .then(function () {
              self.provider.loading = false
            })
        } // TODO: add notifications when it success
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
      }

    },
    data: function () {
      return {
        search: '',
        table: {
          columns: [...tableColumns],
          data: [...tableData]
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
          error: false,
          errorMessage: '',
          modalOn: false,
          loading: false
        }
      }
    },
    computed:
      {
        filteredProviders: function () {
          var self = this
          return this.table.data.filter(function (cust) {
            return cust.attributes.industria.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
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
