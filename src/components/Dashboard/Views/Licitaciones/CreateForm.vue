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
          <label>Tipo de Licitación</label><br style="margin: 0.5%;">
          <p-radio v-model="bidding.type" label="1">Licitación de 1 etapa</p-radio>
          <p-radio v-model="bidding.type" label="2">Licitación de 2 etapas</p-radio>
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
          <div class="col-3">Número de Usuarios Asociados</div>
          <fg-input class="col-1" v-model="bidding.users.amount"></fg-input>
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
        <div class="form-group">
          <small><label class="error" style="color: red;"
                        v-if="etapas.error">{{etapas.errorMessage}}</label></small>
          <table class="table-bordered">
            <td v-for="stage in availableStages">
              <label :for="stage.label">
                <fg-input v-model="stage.title"></fg-input>
              </label>
              <!--<div class="col-1 nc-icon nc-stre-right"></div>-->
              <div class="datepicker-trigger">
                <fg-input
                  type="text"
                  :id="stage.id"
                  :placeholder="stage.placeholder"
                  :value="formatDates(stage.dateOne, stage.dateTwo)"></fg-input>
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
              <table>
                <td>
                  <tr>Hora Inicio</tr>
                  <select class="custom-select custom-select-sm" v-model="stage.timeOne.hour">
                    <!--<option selected :value="stage.timeOne.hour">Hora</option>-->
                    <option v-for="hour in time.hours" :value="hour.value">{{hour.show}}</option>
                  </select>
                  <select class="custom-select custom-select-sm" v-model="stage.timeOne.minute">
                    <!--<option selected :value="stage.timeOne.minute">Minutos</option>-->
                    <option v-for="minute in time.minutes" :value="minute.value">{{minute.show}}</option>
                  </select>
                </td>
                <td>
                  <tr>Hora Término</tr>
                  <select class="custom-select custom-select-sm" v-model="stage.timeTwo.hour">
                    <!--<option selected :value="stage.timeOne.hour">Hora</option>-->
                    <option v-for="hour in time.hours" :value="hour.value">{{hour.show}}</option>
                  </select>
                  <select class="custom-select custom-select-sm" v-model="stage.timeTwo.minute">
                    <!--<option selected :value="stage.timeTwo.minute">Minutos</option>-->
                    <option v-for="minute in time.minutes" :value="minute.value">{{minute.show}}</option>
                  </select>
                </td>
              </table>
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
  import usersApi from 'src/api/index'
  import PCheckbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
  import PRadio from 'src/components/UIComponents/Inputs/Radio.vue'

  export default {
    name: 'CreateForm',
    components: {
      PCheckbox,
      PRadio
    },
    data () {
      return {
        dateFormat: 'D MMM',
        time: {
          hours: [
            {show: '00', value: 0}, {show: '01', value: 1}, {show: '02', value: 2}, {show: '03', value: 3},
            {show: '04', value: 4}, {show: '05', value: 5}, {show: '06', value: 6}, {show: '07', value: 7},
            {show: '08', value: 8}, {show: '09', value: 9}, {show: '10', value: 10}, {show: '11', value: 11},
            {show: '12', value: 12}, {show: '13', value: 13}, {show: '14', value: 14}, {show: '15', value: 15},
            {show: '16', value: 16}, {show: '17', value: 17}, {show: '18', value: 18}, {show: '19', value: 19},
            {show: '20', value: 20}, {show: '21', value: 21}, {show: '22', value: 22}, {show: '23', value: 23}
          ],
          minutes: [
            {show: '00', value: 0}, {show: '10', value: 10}, {show: '20', value: 20},
            {show: '30', value: 30}, {show: '40', value: 40}, {show: '50', value: 50}
          ]
        },
        etapas: {
          amount: 6,
          names: [
            'Recepción de Ofertas',
            'Preguntas',
            'Respuestas',
            'Evaluación Técnica',
            'Evaluación Comercial',
            'Resultados'
          ],
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
          type: 2,
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
        // if (!this.bidding.bases.payload) {
        //   this.bidding.bases.error = true
        //   this.bidding.bases.errorMessage = 'Debe describir las bases de la Licitación'
        // } else this.bidding.bases.error = false
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
          type: this.bidding.type + ' etapa',
          stages: (function () {
            let stages = []
            for (let i = 0; i < self.etapas.amount; ++i) {
              const dateTable = self.etapas.payload[i]
              let stage = {
                title: dateTable.title,
                start: {
                  date: dateTable.dateOne,
                  hour: dateTable.timeOne.hour,
                  minute: dateTable.timeOne.minute
                },
                end: {
                  date: dateTable.dateTwo,
                  hour: dateTable.timeTwo.hour,
                  minute: dateTable.timeTwo.minute}
              }
              stages.push(stage)
            }
            return stages
          })()
        }
      },
      createUsers (users) {
        let user
        for (let i = 0; i < users.amount; ++i) {
          user = users.payload[i]
          if (user.isNew) {
            const data = {
              password: user.password,
              email: user.mail
            }
            usersApi.registerClient(data)
          }
        }
      },
      addBidding () {
        this.checkBiddingInput()
        const bidding = this.parseBidding()
        this.createUsers(bidding.users)
        usersApi.registerBidding(bidding)
        this.$emit('endModal', null)
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
            title: this.etapas.names[i - 1],
            label: 'etapa' + i,
            placeholder: 'Selecciona duración del Período',
            dateOne: '',
            dateTwo: '',
            timeOne: {
              hour: 0,
              minute: 0
            },
            timeTwo: {
              hour: 0,
              minute: 0
            },
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
