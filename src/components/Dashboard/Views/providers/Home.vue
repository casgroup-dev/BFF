<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <div class="row">
                <!-- TITLE -->
                <div class="col-4 offset-4" style="text-align: center; font-size: xx-large">Proveedores</div>
                <!-- BUTTONS -->
                <div class="col-4" style="text-align: right; font-size: xx-large">
                  <!-- INVITE -->
                  <transition name="fade" mode="out-in" appear>
                    <button class="btn btn-success"
                            v-if="providersSelected.length"
                            @click="selectedModal.show = true" v-tooltip="`${providersSelected.length} seleccionados`">
                      Invitar a Licitación
                    </button>
                  </transition>
                  <!-- ADD PROVIDER -->
                  <button class="btn btn-primary" @click="provider.modalOn = true">Agregar proveedor</button>
                </div>
              </div>
            </template>
            <search-bar v-model="search" placeholder="Buscar por industria" style="margin-bottom: 10px;"></search-bar>
            <!-- TABLE WITH PROVIDERS -->
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
                <tr v-for="(provider, index) in filteredProviders" :key="index">
                  <!-- PROVIDER ATTRIBUTES -->
                  <td v-for="(attr, index) in provider.attributes" :key="index">
                    <a style="font-weight:normal; color:#262626;">{{attr}}</a>
                  </td>
                  <!-- SELECT -->
                  <td class="align-center">
                    <p-checkbox v-model="provider.selected" style="margin-top: -7px;"/>
                  </td>
                  <!-- DETAILS -->
                  <td class="align-center">
                    <button class="btn btn-default btn-sm"
                            v-on:click="addProviderToPopup(provider)">
                      Más información
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>
    </div>
    <!-- NOTIFICATIONS -->
    <div v-if="provider.success" style="text-align: center">
      <notifications/>
    </div>
    <!-- MODALS -->
    <!-- ADD PROVIDER -->
    <modal v-if="provider.modalOn">
      <template slot="header">
        <label>Registre a un nuevo proveedor</label>
      </template>
      <template slot="body">
        <label class="error" v-if="provider.error">{{provider.errorMessage}}</label>
        <label class="error" v-if="provider.mail.error">{{provider.mail.errorMessage}}</label>
        <fg-input placeholder="proveedor@suempresa.cl" v-model="provider.mail.payload"/>
        <label class="error" v-if="provider.name.error">{{provider.name.errorMessage}}</label>
        <fg-input placeholder="Nombre Proveedor" v-model="provider.name.payload"/>
        <label class="error" v-if="provider.rut.error">{{provider.rut.errorMessage}}</label>
        <fg-input placeholder="RUT Empresa Proveedor" v-model="provider.rut.payload"/>
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
    <!-- SELECTED PROVIDERS MODAL -->
    <modal v-if="selectedModal.show">
      <h4 slot="header" class="no-margin">Contacto proveedores seleccionados</h4>
      <template slot="body">
        <ul>
          <li v-for="(provider, index) in providersSelected" :key="index">
            <span v-if="provider.attributes.usersEmail">{{provider.attributes.businessName}}:
              <span class="email">{{provider.attributes.usersEmail}}</span></span>
            <span v-else>{{provider.attributes.businessName}} no cuenta con usuarios registrados.</span>
          </li>
        </ul>
      </template>
      <template slot="footer">
        <button class="btn btn-default" @click="selectedModal.show = false">Cancelar</button>
        <!-- COPY TO CLIPBOARD: Hidden input to simulate select -->
        <input type=hidden id="hiddenInput"/>
        <button class="btn btn-primary"
                v-if="providersSelected.length && providersSelected.filter(provider => provider.attributes.usersEmail.length).length"
                @click="copySelectedEmailsToClipboard">
          Copiar emails
        </button>
      </template>
    </modal>
    <!-- PROVIDER DETAILS -->
    <modal v-if="detailsPopup.show">
      <template slot="header">
        <h4 style="margin: 0">Detalles del proveedor</h4>
        <button type="button" class="btn btn-round btn-default btn-sm" @click="cancelPopup">
          <span class="btn-label"><i class="fa fa-times"></i></span> Cerrar
        </button>
      </template>
      <template slot="body">
        <label><b>Razón Social:</b> {{detailsPopup.data.businessName}}<br></label>
        <label><b>Mail Admin Proveedor:</b> {{detailsPopup.data.usersEmail}}<br></label>
        <label><b>Teléfono Admin Proveedor:</b> {{detailsPopup.data.usersPhone}}<br></label>
        <label><b>Rubros:</b> {{detailsPopup.data.industries}}<br/></label>
        <label><b>RUT:</b> {{detailsPopup.data.rut}}<br/></label>
        <label><b>Usuarios:</b> {{detailsPopup.data.users}}<br></label>
        <label><b>Representante Legal:</b> {{detailsPopup.data.legalRepresentative}}<br></label>
        <label><b>Email Representante Legal:</b> {{detailsPopup.data.legalRepEmail}}<br></label>
        <label><b>Telefono Representante Legal:</b> {{detailsPopup.data.legalRepPhone}}<br></label>
        <label><b>Nombre de Fantasía:</b> {{detailsPopup.data.fantasyName}}<br></label>
      </template>
    </modal>
  </div>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import Modal from 'src/components/UIComponents/Modal/Modal.vue'
  import SearchBar from 'src/components/UIComponents/Inputs/SearchBar.vue'
  import ClipLoader from 'vue-spinner/src/ClipLoader'
  import usersApi from 'src/apis/users'
  import VueNotify from 'vue-notifyjs'
  import PCheckbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
  import Icons from '../Icons'

  export default {
    components: {
      Icons,
      LTable,
      Card,
      Modal,
      ClipLoader,
      VueNotify,
      PCheckbox,
      SearchBar
    },
    /* DATA OF THE COMPONENT */
    data: function () {
      return {
        search: '',
        table: {
          columns: {
            attributes: [
              'Razón social',
              'Mail Admin Proveedor',
              'Telefono Admin Proveedor',
              '',
              ''
            ],
            details: {
              industries: 'Rubros',
              rut: 'RUT',
              users: 'Usuarios',
              legalRepresentative: 'Representante Legal',
              legalRepEmail: 'Email Representante Legal',
              legalRepPhone: 'Telefono Representante Legal',
              fantasyName: 'Fantasy Name'
            }
          },
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
          modalOn: false,
          loading: false,
          success: false,
          invited: false
        },
        /* Modal to show the selected providers' contact information */
        selectedModal: {
          show: false
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
    /* METHODS OF THE COMPONENTS */
    methods: {
      /**
       * Adds a provider to give him permission to register on the platform.
       */
      addProvider: function () {
        if (!this.provider.mail.payload) {
          this.provider.mail.error = true
          this.provider.mail.errorMessage = 'El email es obligatorio'
        } else {
          const self = this
          self.provider.loading = true
          usersApi.registerProvider(this.provider.name.payload, this.provider.rut.payload, this.provider.mail.payload)
            .then(function () {
              self.cancelModal()
              self.provider.success = true
              self.addNotification()
            })
            .catch(function () {
              // TODO: Manage messages per type of error
              self.provider.error = true
              self.provider.errorMessage = 'Este proveedor ya existe en el sistema'
            })
            .then(function () {
              self.provider.loading = false
            })
        }
      },
      companiesToTable: function (companies) {
        return companies.map(company => {
          return {
            attributes: {
              businessName: company['businessName'],
              usersEmail: company['users']// .filter(user => user.role === 'companyAdmin')
                .map(user => user.email).join(', '),
              usersPhone: company['users'].filter(user => {
                return user.role === 'companyAdmin'
              }).map(user => user.phone).join(', ')
            },
            details: {
              industries: company['industries'].join(', '),
              rut: company['rut'],
              users: company['users'].map(user => user.name + ' (' + user.role + ') ').join(', '),
              legalRepresentative: company['legalRepresentative'],
              legalRepEmail: company['legalRepEmail'],
              legalRepPhone: company['legalRepPhone'],
              fantasyName: company['fantasyName']
            }
          }
        })
      },
      cancelModal: function () {
        this.provider.modalOn = false
        this.provider.name.payload = this.provider.rut.payload = this.provider.mail.payload = ''
        this.provider.error = this.provider.name.error = this.provider.rut.error = this.provider.mail.error = false
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
      },
      /**
       * Removes the hidden value of the hidden input, set the value to the emails selected, select the value,
       * copy and hide again the input.
       */
      copySelectedEmailsToClipboard: function () {
        const hiddenInput = document.getElementById('hiddenInput')
        hiddenInput.setAttribute('type', 'text')
        hiddenInput.value = this.providersSelected
          .map(provider => provider.attributes.usersEmail)
          .filter(email => email).join(', ')
        hiddenInput.select()
        document.execCommand('copy')
        hiddenInput.setAttribute('type', 'hidden')
        window.getSelection().removeAllRanges()
        this.selectedModal.show = false
        this.$notify({
          message: 'Emails copiados exitósamente',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'success'
        })
      }
    },
    /* HOOKS */
    created: function () {
      const self = this
      usersApi.getCompanies().then(data => {
        self.table.data = self.companiesToTable(data)
      })
    },
    /* COMPUTED DATA */
    computed: {
      filteredProviders: function () {
        const self = this
        return this.table.data.filter(function (prov) {
          return prov.details.industries.toLowerCase().includes(self.search.toLowerCase())
        })
      },
      providersSelected: function () {
        return this.filteredProviders.filter(provider => provider.selected)
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

  table th {
    font-weight: bold;
  }

  .align-center {
    text-align: center;
  }

  .no-margin {
    margin: 0;
  }

  span.email {
    background-color: #eff0ff;
    color: #757791;
    padding: 3px 7px;
    border-radius: 3px;
  }

</style>
