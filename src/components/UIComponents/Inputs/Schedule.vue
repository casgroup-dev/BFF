<template>
  <div class="content">
    <div class="container-fluid">
      <form>
        <div class="form-group">
          <label>Nombre Licitacion</label><br style="margin: 0.5%;">
          <small><label class="error" style="color: red;"
                        v-if="bidding.name.error">{{bidding.name.errorMessage}}</label></small>
          <fg-input placeholder="Nombre Licitación" v-model="bidding.name.payload"></fg-input>
        </div>
        <div class="form-group">
          <label>Empresa Autora</label><br style="margin: 0.5%;">
          <small><label class="error" style="color: red;"
                        v-if="bidding.company.error">{{bidding.company.errorMessage}}</label></small>
          <fg-input placeholder="CasGroup" v-model="bidding.company.payload"></fg-input>
        </div>
        <div class="form-group">
          <label>Bases</label><br style="margin: 0.5%;">
          <small><label class="error" style="color: red;"
                        v-if="bidding.bases.error">{{bidding.bases.errorMessage}}</label></small>
          <textarea class="form-control" v-model="bidding.bases.payload" style="height: 150px;"></textarea>
          <small id="basesHelpBlock" class="form-text text-muted">
            Descripción de bases PENDIENTE
          </small>
        </div>
        <small><label class="error" style="color: red;"
                      v-if="bidding.users.error">{{bidding.users.errorMessage}}</label></small>
        <div class="row"> <!-- PENDIENTE corregir alineación -->
          <div class="col-7">Numero de Usuarios Asociados</div>
          <fg-input class="col-2" v-model="bidding.users.amount"></fg-input>
        </div>
        <div class="form-group">
          <div class="form-row" v-for="user in usersAndRoles">
            <div class="col-md-10" style="color: red; font-size: 10px;"
                 v-if="user.error">{{user.errorMessage}}
            </div>
            <div class="col-md-10" style="color: red; font-size: 10px;"
                 v-if="user.isNew">{{user.errorMessage}}
            </div>
            <div v-if="!user.isNew" class="col-md-4">
              <fg-input placeholder="Email Usuario" v-model="user.mail" @input="timedValidation(user)"></fg-input>
            </div>
            <div v-else class="col-md-4">
              <fg-input placeholder="Email Usuario" v-model="user.mail" @input="timedValidation(user)"></fg-input>
            </div>
            <div v-if="user.isNew" class="col-md-4">
              <fg-input placeholder="Contraseña" v-model="user.password" type="password"></fg-input>
            </div>
            <div class="row-md-4">
              <p-checkbox v-model="user.role.revisor">Revisor</p-checkbox>
              <p-checkbox v-model="user.role.aprobador">Aprobador</p-checkbox>
            </div>
          </div>
        </div>
        <div class="row"> <!-- PENDIENTE corregir alineación -->
          <div class="col-5">Numero de Etapas</div>
          <fg-input class="col-2" v-model="etapas.amount"></fg-input>
        </div>
        <div class="form-group">
          <small><label class="error" style="color: red;"
                        v-if="etapas.error">{{etapas.errorMessage}}</label></small>
          <table>
            <td v-for="stage in availableStages">
              <label :for="stage.label">
                <fg-input v-model="stage.title"></fg-input>
              </label>
              <div>
                <div class="datepicker-trigger">
                  <input
                    type="text"
                    :id="stage.id"
                    :placeholder="stage.placeholder"
                    :value="formatDates(stage.dateOne, stage.dateTwo)">
                  <AirbnbStyleDatepicker
                    :trigger-element-id="stage.id"
                    :mode="'range'"
                    :fullscreen-mobile="true"
                    :months-to-show="1"
                    :date-one="stage.dateOne"
                    :date-two="stage.dateTwo"
                    @date-one-selected="val => { stage.dateOne = val }"
                    @date-two-selected="val => { stage.dateTwo = val }">
                  </AirbnbStyleDatepicker>
                </div>
              </div>
            </td>
          </table>
        </div>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="customFile">
          <label class="custom-file-label" for="customFile">Subir versión completa Licitación</label>
        </div>
        <br><br>
        <button type="submit" class="btn btn-primary" @click="addBidding">Crear</button>
      </form>
    </div>
  </div>
</template>

<script>
  import format from 'date-fns/format'
  import usersApi from 'src/apis/users'
  import PCheckbox from 'src/components/UIComponents/Inputs/Checkbox.vue'

  export default {
    name: 'CreateForm',
    components: {
      PCheckbox
    },
    data () {
      return {
        dateFormat: 'D MMM',
        etapas: {
          amount: 2,
          payload: [],
          error: false,
          errorMessage: ''
        },
        bidding: {
          name: {
            payload: '',
            error: false,
            errorMessage: ''
          },
          company: {
            payload: '',
            error: false,
            errorMessage: ''
          },
          bases: {
            payload: '',
            error: false,
            errorMessage: ''
          },
          users: {
            amount: 2,
            payload: [],
            error: false,
            errorMessage: '',
            validateTimeoutID: 0
          }
        }
      }
    },
    methods: {
      formatDates (dateOne, dateTwo) {
        let formattedDates = ''
        if (dateOne) {
          formattedDates = format(dateOne, this.dateFormat)
        }
        if (dateTwo) {
          formattedDates += ' - ' + format(dateTwo, this.dateFormat)
        }
        return formattedDates
      },
      timedValidation (user) {
        clearTimeout(this.bidding.users.validateTimeoutID)
        this.bidding.users.validateTimeoutID = setTimeout(() => { this.validateAccount(user) }, 750)
      },
      isMail (mail) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      },
      validateAccount (user) {
        if (!this.isMail(user.mail)) {
          user.error = true
          user.isNew = false
          user.errorMessage = 'Cuenta no válida. Debe ingresar un correro electrónico'
        } else user.error = false
        if (!user.error) {
          usersApi.checkEmail(user.mail).then(res => { user.isNew = !res })
          user.errorMessage = 'Usuario no creado. Se generará junto con una contraseña'
        }
      },
      checkBiddingInput () {
        if (!this.etapas.payload || !this.etapas.payload[0].dateOne || !this.etapas.payload[0].dateTwo) {
          this.etapas.error = true
          this.etapas.errorMessage = 'Debe definir las fechas de la Licitación'
        } else this.etapas.error = false
        if (!this.bidding.company.payload) {
          this.bidding.company.error = true
          this.bidding.company.errorMessage = 'Debe asignar la Licitacion a una empresa'
        } else this.bidding.company.error = false
        if (!this.bidding.name.payload) {
          this.bidding.name.error = true
          this.bidding.name.errorMessage = 'Debe asignar un nombre a la Licitación'
        } else this.bidding.name.error = false
        if (!this.bidding.bases.payload) {
          this.bidding.bases.error = true
          this.bidding.bases.errorMessage = 'Debe describir las bases de la Licitación'
        } else this.bidding.bases.error = false
        if (!this.bidding.users.payload[0].mail || (this.bidding.users.payload[0].role === 'Seleccione el Rol')) {
          this.bidding.users.error = true
          this.bidding.users.errorMessage = 'Debe asociar al menos un usuario a la Licitación'
        } else this.bidding.users.error = false
      },
      parseBidding () {
        const self = this
        return {
          name: this.bidding.name,
          company: this.bidding.company,
          users: this.bidding.users,
          bases: this.bidding.bases,
          stages: (function () {
            let stages = []
            for (let i = 0; i < self.etapas.amount; ++i) {
              const dateTable = self.etapas.payload[i]
              let stage = {
                title: dateTable.title,
                dateOne: dateTable.dateOne,
                dateTwo: dateTable.dateTwo
              }
              stages.push(stage)
            }
            return stages
          })()
        }
      },
      createUsers (bidding) {
        var user
        for (var i = 0; i < bidding.users.amount; ++i) {
          user = bidding.users.payload[i]
          if (user.isNew) {
            const data = {
              businessName: null,
              fantasyName: null,
              rut: null,
              industries: null,
              legalRepresentative: null,
              legalRepEmail: null,
              legalRepPhone: null,
              name: null,
              password: user.password,
              email: user.email
            }
            usersApi.register(data)
          }
        }
      },
      addBidding () {
        this.checkBiddingInput()
        const bidding = this.parseBidding()
        this.createUsers(bidding)
      }
    },
    computed: {
      usersAndRoles: function () {
        let users = []
        for (let i = 1; i <= this.bidding.users.amount; ++i) {
          let user = {
            mail: '',
            role: {
              revisor: false,
              aprobador: false
            },
            error: false,
            errorMessage: '',
            isNew: false,
            password: ''
          }
          users.push(user)
        }
        this.bidding.users.payload = users
        return this.bidding.users.payload
      },
      availableStages: function () {
        let stages = []
        for (let i = 1; i <= this.etapas.amount; ++i) {
          let stage = {
            title: 'Etapa ' + i,
            label: 'etapa' + i,
            placeholder: 'Selecciona duración del Etapa',
            dateOne: '',
            dateTwo: '',
            id: 'datepicker-trigger' + i
          }
          stages.push(stage)
        }
        this.etapas.payload = stages
        return this.etapas.payload
      }
    }
  }
</script>

<style>
</style>
