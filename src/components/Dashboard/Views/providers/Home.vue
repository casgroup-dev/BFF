<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <div class="row">
                <div class="col-4" style="text-align: left; font-size: xx-large">
                  <clip-loader :loading="invited.inviteToBiddingLoading" color="#5D8EF9"/>
                  <button label="Hola!\nhola" class="btn btn-primary btn-lg btn-fill" style="font-size: large" @click="inviteToBidding()">
                    Invitar a Licitación<br />
                    ({{this.invited.data.length}} seleccionados)
                  </button>
                </div>
                <div class="col-4" style="text-align: center; font-size: xx-large">
                  Proveedores
                </div>
                <div class="col-4" style="text-align: right; font-size: xx-large">
                  <button class="btn btn-primary btn-sm" style="font-size: large" @click="provider.modalOn = true">
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
                  <th v-for="attr in table.columns.attributes">
                    <tr scope="col">{{attr}}</tr>
                  </th>
                  </thead>
                  <tbody>
                  <template v-for="provider in filteredProviders">
                    <tr>
                      <td v-for="attr in provider.attributes">
                        <a
                          style="font-weight:normal; color:#262626;">
                          {{attr}}
                        </a>
                      </td>
                      <td>
                        <i class="nc-icon nc-check-2" v-if="provider.active"></i>
                        <i class="nc-icon nc-simple-remove" v-else></i>
                      </td>
                      <td>
                        <input type="checkbox" id="invited_checkbox" v-model=provider.invited v-on:click="checkboxClicked(provider)">
                      </td>
                      <td>
                        <button class="btn btn-primary" style="font-size: large" v-on:click="addProviderToPopup(provider)">
                          Ver Detalles
                        </button>
                      </td>
                    </tr>
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

    <modal v-if="invited.modalOn">
      <template slot="header">
        <label>Invitar a Licitación</label>
      </template>
      <template slot="body">
        <div class="modal-body">
          <slot name="body" v-if="invited.selectBidding">
            <label>Seleccionar Licitación Activa:</label>
            <select v-model="invited.selectedBidding">
              <option v-for="option in invited.biddings" v-bind:value="option">
                {{ option }}
              </option>
            </select>
          </slot>
          <slot>
            <span>Seleccionado: {{ invited.selectedBidding }}</span>
          </slot>
          <slot name="body" v-if="invited.confirmation">
            <label> Proveedores invitados: </label>
            <li v-for="provider in invited.data">
              {{ provider.attributes.businessName }}
            </li>
          </slot>
        </div>
      </template>
      <template slot="footer">
        <button class="btn btn-primary" @click="cancelInvitation()">
          {{invited.goBackMessage}}
        </button>
        <clip-loader :loading="invited.confirmationLoading" color="#5D8EF9"/>
        <button class="btn btn-primary btn-fill" v-if="invited.acceptButton" @click="acceptInvitation()">
          Aceptar
        </button>
        <button class="btn btn-primary btn-fill" v-if="invited.confirmButton" @click="confirmInvitation()">
          Confirmar
        </button>
        <div class="alert alert-success hide" v-if="invited.successMessage">Invitaciones enviadas con éxito</div>
        <!--TODO: Cuadro de confirmacion se ve desalineado con los botones-->
      </template>
    </modal>


    <modal v-if="detailsPopup.show">
      <template slot="header">
        <label>Detalles del proveedor</label>
      </template>
      <template slot="body">
        <label><b>Razón Social:</b> {{detailsPopup.data.businessName}}<br></label>
        <label><b>Mail Admin Proveedor:</b> {{detailsPopup.data.usersEmail}}<br></label>
        <label><b>Teléfono Admin Proveedor:</b> {{detailsPopup.data.usersPhone}}<br></label>
        <label><b>Rubros:</b> {{detailsPopup.data.industries}}<br /></label>
        <label><b>RUT:</b> {{detailsPopup.data.rut}}<br /></label>
        <label><b>Usuarios:</b> {{detailsPopup.data.users}}<br></label>
        <label><b>Representante Legal:</b> {{detailsPopup.data.legalRepresentative}}<br></label>
        <label><b>Email Representante Legal:</b> {{detailsPopup.data.legalRepEmail}}<br></label>
        <label><b>Telefono Representante Legal:</b> {{detailsPopup.data.legalRepPhone}}<br></label>
        <label><b>Nombre de Fantasía:</b> {{detailsPopup.data.fantasyName}}<br></label>
      </template>
      <template slot="footer">
        <button class="btn btn-primary" @click="cancelPopup">
          Volver
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

  const tableColumns = {
    'attributes': [
      'Razón social',
      'Mail Admin Proveedor',
      'Telefono Admin Proveedor',
      'Active',
      'Invitar',
      'Details'
    ],
    'details': {
      'industries': 'Rubros',
      'rut': 'RUT',
      'users': 'Usuarios',
      'legalRepresentative': 'Representante Legal',
      'legalRepEmail': 'Email Representante Legal',
      'legalRepPhone': 'Telefono Representante Legal',
      'fantasyName': 'Fantasy Name'
    }
  }

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

      checkboxClicked: function(row) {
        if (row.invited == true){
          var index = this.invited.data.indexOf(row)
          if (index > -1) {
            this.invited.data.splice(index, 1)
          }
          row.invited = false
        } else{
          this.invited.data.push(row)
          row.invited = true
        }

      },

      inviteToBidding: function(){
          if(this.invited.data.length == 0){
            //TODO: mensaje de Error
          } else{
            this.invited.modalOn = true
          }
      },

      companiesToTable: function (companies) {
        return companies.map(company => {
          return {
            'attributes': {
              'businessName': company['businessName'],
              'usersEmail': company['users'].filter(user => {
                return user.role === "companyAdmin"
              }).map(user => user.email).join(', '),
              'usersPhone': company['users'].filter(user => {
                return user.role === "companyAdmin"
              }).map(user => user.phone).join(', ')
            },
            'details': {
              'industries': company['industries'].join(', '),
              'rut': company['rut'],
              'users': company['users'].map(user => user.name + " (" + user.role + ") ").join(', '),
              'legalRepresentative': company['legalRepresentative'],
              'legalRepEmail': company['legalRepEmail'],
              'legalRepPhone': company['legalRepPhone'],
              'fantasyName': company['fantasyName'],
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

      acceptInvitation: function() {
        if (this.invited.selectedBidding === ""){
          //TODO: mensaje: "elegir licitacion"
        } else {
          this.invited.acceptButton = false
          this.invited.confirmButton = true
          this.invited.selectBidding = false
          this.invited.confirmation = true
        }
      },

      cancelInvitation: function() {
        this.invited.modalOn = false
        this.invited.selectedBidding = ""
        this.invited.acceptButton = true
        this.invited.confirmButton = false
        this.invited.confirmation = false
        this.invited.selectBidding = true
        this.invited.goBackMessage = "Cancelar"
        this.invited.successMessage = false
      },

      confirmInvitation: async function() {
        this.invited.confirmButton = false
        this.invited.confirmationLoading = true
        this.invited.goBackMessage = "Volver"
        usersApi.invitationsToBidding(this.invited.data, this.invited.selectedBidding)
          .then(function () {
            this.invited.confirmationLoading = false
            this.invited.successMessage = true
          }.bind(this))

      },

      addProviderToPopup: function (provider) {
        this.detailsPopup.show = true
        this.detailsPopup.data.businessName = provider.attributes.businessName
        this.detailsPopup.data.usersEmail = provider.attributes.usersEmail
        this.detailsPopup.data.usersPhone = provider.attributes.usersPhone
        this.detailsPopup.data.legalRepresentative = provider.details.legalRepresentative
        this.detailsPopup.data.legalRepEmail = provider.details.legalRepEmail
        this.detailsPopup.data.legalRepPhone = provider.details.legalRepPhone
        this.detailsPopup.data.industries = provider.details.industries
        this.detailsPopup.data.users = provider.details.users
        this.detailsPopup.data.fantasyName = provider.details.fantasyName
        this.detailsPopup.data.rut = provider.details.rut
      },

      cancelPopup: function () {
        this.detailsPopup.show = false
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
          columns: tableColumns,
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
          success: false,
          invited: false
        },
        invited: {
          data: [],
          modalOn: false,
          selectBidding: true,
          confirmation: false,
          biddings: ['Licitacion1','Licitacion2','Licitacion3'],
          selectedBidding: "",
          acceptButton: true,
          confirmButton: false,
          inviteToBiddingLoading: false,
          confirmationLoading: false,
          successMessage: false,
          goBackMessage: "Cancelar"
        },
        detailsPopup: {
          show: false,
          data: {
            businessName: '',
            usersEmail: '',
            usersPhone: '',
            industries: '',
            rut: '',
            users: '',
            legalRepresentative: '',
            legalRepEmail: '',
            legalRepPhone: '',
            fantasyName: ''
          }
        }
      }
    },
    created: function () {
      const self = this
      usersApi.getCompanies().then(data => {
        const temp = data
        self.table.data = self.companiesToTable(temp)
      })
    },
    computed:
      {
        filteredProviders: function () {
          var self = this
          return this.table.data.filter(function (prov) {
            return prov.details.industries.toLowerCase().includes(self.search.toLowerCase())
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
