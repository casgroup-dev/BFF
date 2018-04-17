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
                  <button class="btn btn-primary" style="font-size: large" @click="providerModal.modalOn = true">
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
    <modal v-if="providerModal.modalOn">
      <template slot="header">
        <label>Registre a un nuevo proveedor</label>
      </template>
      <template slot="body">
        <label class="error" v-if="providerModal.error">{{providerModal.errorMessage}}</label>
        <fg-input placeholder="proveedor@suempresa.cl" v-model="providerModal.newEmail"></fg-input>
      </template>
      <template slot="footer">
        <button class="btn btn-primary" @click="addProvider">
          Autorizar proveedor
        </button>
        <button class="btn btn-primary" @click="cancelModal">
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
      Modal
    },
    methods: {
      addProvider: function () {
        if (this.providerModal.newEmail === '') {
          this.providerModal.error = true
          this.providerModal.errorMessage = 'Este campo es obligatorio'
        } else {
          const self = this
          usersApi.registerProvider(this.providerModal.newEmail)
            .then(function () {
              self.cancelModal()
            })
            .catch(function (err) {
              self.providerModal.error = true
              self.providerModal.errorMessage = 'Este proveedor ya existe en el sistema'
            })
        } // TODO: add spinner
      },

      cancelModal: function () {
        this.providerModal.error = this.providerModal.modalOn = false
        this.providerModal.newEmail = ''
      }
    },
    data: function () {
      return {
        search: '',
        table: {
          columns: [...tableColumns],
          data: [...tableData]
        },
        providerModal: {newEmail: '', modalOn: false, error: false, errorMessage: ''}
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

  .margin-top {
    margin-top: 10px
  }

  .text-gray {
    color: #889494
  }
</style>
