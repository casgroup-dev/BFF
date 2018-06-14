<template>
  <div class="content">
    <div class="container-fluid">
      <form>
        <div v-if="formPage === 1">
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
            <textarea class="form-control" v-model="bidding.bases.text" style="height: 50px;"></textarea>
            <small id="basesHelpBlock" class="form-text text-muted">
              Descripción de bases PENDIENTE
            </small>
          </div>
          <FileInputCard class="col-4" title="Subir Bases" v-on:uploaded="save(url, fileName)"></FileInputCard>
          <br/>
          <button type="submit" class="btn btn-default" @click="formPage = formPage + 1">Siguiente</button>
        </div>
        <div v-else-if="formPage === 2">
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
          <button type="submit" class="btn btn-default" @click="formPage = formPage - 1">Anterior</button>
          <button type="submit" class="btn btn-default" @click="formPage = formPage + 1">Siguiente</button>
        </div>
        <div v-else-if="formPage === 3">
          <div class="row"> <!-- PENDIENTE corregir alineación -->
            <div class="col-3">Número de Productos Deseados</div>
            <fg-input class="col-1"@input="bidding.requests.amount = parseInt(bidding.requests.amount)"
                      v-model="bidding.requests.amount"/>
          </div>
          <small><label class="error" style="color: red;"
                        v-if="bidding.requests.error">{{bidding.requests.errorMessage}}</label></small>
          <div class="row">
            <label class="col-4" >Nombre del Producto</label>
            <label class="col-4" >Cantidad</label>
            <label class="col-4" >Unidad de medida</label>
          </div>
          <div class="row" v-for="request in buildRequest">
            <fg-input class="col-4" placeholder="Producto" v-model="request.itemName"/>
            <fg-input class="col-4" placeholder="Cantidad" v-model="request.wantedAmount"/>
            <fg-input class="col-4" placeholder="Unidad de Medida" v-model="request.measureUnit"/>
          </div>
          <button type="submit" class="btn btn-default" @click="formPage = formPage - 1">Anterior</button>
          <button type="submit" class="btn btn-default" @click="formPage = formPage + 1">Siguiente</button>
        </div>
        <div v-else-if="formPage === 4">
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
          <small><label class="error" style="color: red;"
                        v-if="bidding.generalError">{{bidding.generalErrorMessage}}</label></small>
          <div>
            <button type="submit" class="btn btn-default" @click="formPage = formPage - 1">Anterior</button>
            <button type="submit" class="btn btn-primary" @click="addBidding">{{buttonCaption}}</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import format from 'date-fns/format'
  import usersApi from 'src/api/index'
  import PCheckbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
  import PRadio from 'src/components/UIComponents/Inputs/Radio.vue'
  import FileInputCard from 'src/components/UIComponents/Inputs/FileInputCard'

  export default {
    name: 'CreateForm',
    props: {
      buttonCaption: {
        type: String,
        default: 'Crear'
      }
    },
    components: {
      PCheckbox,
      PRadio,
      FileInputCard
    },
    data () {
      return {
        formPage: 1,
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
          names: ['Recepción de Ofertas', 'Preguntas', 'Respuestas',
            'Evaluación Técnica', 'Evaluación Comercial', 'Resultados'],
          save_names: ['reception', 'questions', 'answers', 'technicalEvaluation', 'economicalEvaluation', 'results'],
          payload: [],
          error: false,
          errorMessage: 'Debe definir las fechas de la Licitación'
        },
        bidding: {
          generalError: false,
          generalErrorMessage: 'Faltan campos obligatorios por rellenar',
          name: {
            payload: '',
            error: false,
            errorMessage: 'Debe asignar un nombre a la Licitación'
          },
          company: {
            payload: '',
            error: false,
            errorMessage: 'Debe asignar la Licitacion a una empresa'
          },
          type: '2',
          bases: {
            text: '',
            files: [],
            error: false,
            errorMessage: ''
          },
          requests: {
            amount: 5,
            payload: [],
            error: false,
            errorMessage: 'Debe asignar los nombres, medidas y/o cantidades a los productos pedidos'
          },
          users: {
            amount: 2,
            payload: [],
            error: false,
            errorMessage: 'Debe asociar al menos un usuario a la Licitación',
            validateTimeoutID: 0
          }
        }
      }
    },
    methods: {
      save (url, fileName) {
        let file = {
          name: fileName,
          url: url
        }
        this.biddings.bases.files.push(file)
      },
      addBidding () {
        this.checkBiddingInput()
        const bidding = this.parseBidding()
        this.createUsers(bidding.users)
        const self = this
        usersApi.registerBidding(bidding).then(res => {
          if (res) {
            self.$emit('endModal', null)
          }
        }
        )
      },
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
        this.etapas.error = !this.etapas.payload || !this.etapas.payload[0].dateOne || !this.etapas.payload[0].dateTwo
        this.bidding.company.error = !this.bidding.company.payload
        this.bidding.name.error = !this.bidding.name.payload
        this.bidding.requests.error = this.bidding.requests.amount > 0 && !this.bidding.requests.payload[0]
        this.bidding.users.error =
          !this.bidding.users.payload[0].mail || (this.bidding.users.payload[0].role === 'Seleccione el Rol')
        this.bidding.generalError = this.bidding.company.error || this.bidding.name.error ||
          this.bidding.requests.error || this.bidding.users.error || this.etapas.error
      },
      parseDate (date, time) {
        let split = date.split('-')
        let year = parseInt(split[0])
        let month = parseInt(split[1]) - 1
        let day = parseInt(split[2])
        return new Date(year, month, day, time.hour, time.minute)
      },
      parseBidding () {
        const self = this
        return {
          name: this.bidding.name.payload,
          company: this.bidding.company.payload,
          users: this.bidding.users.payload,
          rules: {
            summary: this.bidding.bases.text,
            files: this.bidding.bases.files
          },
          type: this.bidding.type,
          stages: (function () {
            let stages = []
            for (let i = 0; i < self.etapas.amount; ++i) {
              const dateTable = self.etapas.payload[i]
              let stage = {
                title: dateTable.title,
                save_name: dateTable.save_name,
                start: self.parseDate(dateTable.dateOne, dateTable.timeOne),
                end: self.parseDate(dateTable.dateTwo, dateTable.timeTwo)
              }
              stages.push(stage)
            }
            return stages
          })(),
          items: this.bidding.requests.payload
        }
      },
      createUsers (users) {
        let user
        for (let i = 0; i < users.length; ++i) {
          user = users[i]
          if (user.isNew) {
            const data = {
              password: user.password,
              email: user.mail
            }
            usersApi.registerClient(data)
          }
        }
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
      buildRequest: function () {
        let requests = []
        for (let i = 1; i <= this.bidding.requests.amount; ++i) {
          let request = {
            itemName: '',
            wantedAmount: '',
            measureUnit: ''
          }
          requests.push(request)
        }
        this.bidding.requests.payload = requests
        return this.bidding.requests.payload
      },
      availableStages: function () {
        let stages = []
        for (let i = 0; i < this.etapas.amount; ++i) {
          let stage = {
            title: this.etapas.names[i],
            save_name: this.etapas.save_names[i],
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
            id: 'datepicker-trigger' + (i + 1)
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
