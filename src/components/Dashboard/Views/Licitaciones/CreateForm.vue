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
            <label>Empresa Mandante</label><br style="margin: 0.5%;">
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
              Descripción resumida de las bases, para una versión acotada del documento subido
            </small>
          </div>
          <FileInputCard class="col-4" title="Subir Bases" v-if="bidding.bases.show" v-on:uploaded="save"/>
          <br/>
          <div class="row">
            <div class="col-6">
              <button type="submit" class="btn btn-default" @click="formPage = formPage + 1">Siguiente</button>
            </div>
            <!--<div class="col-6">-->
              <!--<button type="submit" v-if="this.modify"-->
                      <!--class="float-right btn btn-danger btn-fill" @click="deleteBidding">Eliminar</button>-->
            <!--</div>-->
          </div>
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
                <p-checkbox :inline="true" v-model="user.role.cliente">Cliente</p-checkbox>
              </div>
              <div class="row-md-4">
                <p-checkbox v-if="modify" :disabled="true" v-model="user.role.ingeniero">Ingeniero</p-checkbox>
              </div>
              <div class="row-md-4">
                <p-checkbox v-if="modify" :disabled="true" v-model="user.role.proveedor">Proveedor</p-checkbox>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <button type="submit" class="btn btn-default" @click="formPage = formPage - 1">Anterior</button>
              <button type="submit" class="btn btn-default" @click="formPage = formPage + 1">Siguiente</button>
            </div>
            <!--<div class="col-6">-->
              <!--<button type="submit" v-if="this.modify"-->
                      <!--class="float-right btn btn-danger btn-fill" @click="deleteBidding">Eliminar</button>-->
            <!--</div>-->
          </div>
        </div>
        <div v-else-if="formPage === 3">
          <div class="row"> <!-- PENDIENTE corregir alineación -->
            <div class="col-3">Número de Productos Deseados</div>
            <fg-input class="col-1"@input="bidding.requests.amount = parseInt(bidding.requests.amount) || 0"
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
          <div class="row">
            <div class="col-6">
              <button type="submit" class="btn btn-default" @click="formPage = formPage - 1">Anterior</button>
              <button type="submit" class="btn btn-default" @click="formPage = formPage + 1">Siguiente</button>
            </div>
            <!--<div class="col-6">-->
              <!--<button type="submit" v-if="this.modify"-->
                      <!--class="float-right btn btn-danger btn-fill" @click="deleteBidding">Eliminar</button>-->
            <!--</div>-->
          </div>
        </div>
        <div v-else-if="formPage === 4">
          <div class="form-group">
            <small><label class="error" style="color: red;"
                          v-if="etapas.error">{{etapas.errorMessage}}</label></small>
            <table class="table-bordered">
              <td v-for="(stage, index) in availableStages" :key="`date-picker-${index}`">
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
                    :offset-x="-50"
                    :offset-y="-70"
                    :date-one="stage.dateOne"
                    :date-two="stage.dateTwo"
                    @date-one-selected="val => { stage.dateOne = val }"
                    @date-two-selected="val => { stage.dateTwo = val }">
                  </AirbnbStyleDatepicker>
                </div>
                <table>
                  <tr>
                    <td>Hora Inicio</td>
                    <td><select class="custom-select custom-select-sm" v-model="stage.timeOne.hour">
                      <option v-for="hour in time.hours" :value="hour.value">{{hour.show}}</option>
                    </select></td>
                    <td><select class="custom-select custom-select-sm" v-model="stage.timeOne.minute">
                      <option v-for="minute in time.minutes" :value="minute.value">{{minute.show}}</option>
                    </select></td>
                  </tr>
                  <tr>
                    <td>Hora Término</td>
                    <td><select class="custom-select custom-select-sm" v-model="stage.timeTwo.hour">
                      <option v-for="hour in time.hours" :value="hour.value">{{hour.show}}</option>
                    </select></td>
                    <td><select class="custom-select custom-select-sm" v-model="stage.timeTwo.minute">
                      <option v-for="minute in time.minutes" :value="minute.value">{{minute.show}}</option>
                    </select></td>
                  </tr>
                </table>
              </td>
            </table>
            <br><br><br><br><br><br>
          </div>
          <small><label class="error" style="color: red;"
                        v-if="bidding.generalError">{{bidding.generalErrorMessage}}</label></small>
          <div class="row">
            <div class="col-6">
              <button type="submit" class="btn btn-default" @click="formPage = formPage - 1">Anterior</button>
              <button type="submit" class="btn btn-primary" @click="addBidding">{{caption}}</button>
            </div>
            <!--<div class="col-6">-->
              <!--<button type="submit" v-if="this.modify"-->
                      <!--class="float-right btn btn-danger btn-fill" @click="deleteBidding">Eliminar</button>-->
            <!--</div>-->
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
      modify: {
        type: Boolean,
        default: false
      },
      loadedBidding: {
        type: Object
      }
    },
    components: {
      PCheckbox,
      PRadio,
      FileInputCard
    },
    data () {
      return {
        caption: 'Crear',
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
            {show: '00', value: 0}, {show: '01', value: 1}, {show: '02', value: 2}, {show: '03', value: 3},
            {show: '04', value: 4}, {show: '05', value: 5}, {show: '06', value: 6}, {show: '07', value: 7},
            {show: '08', value: 8}, {show: '09', value: 9}, {show: '10', value: 10}, {show: '11', value: 11},
            {show: '12', value: 12}, {show: '13', value: 13}, {show: '14', value: 14}, {show: '15', value: 15},
            {show: '16', value: 16}, {show: '17', value: 17}, {show: '18', value: 18}, {show: '19', value: 19},
            {show: '20', value: 20}, {show: '21', value: 21}, {show: '22', value: 22}, {show: '23', value: 23},
            {show: '24', value: 24}, {show: '25', value: 25}, {show: '26', value: 26}, {show: '27', value: 27},
            {show: '28', value: 28}, {show: '29', value: 29}, {show: '30', value: 30}, {show: '31', value: 31},
            {show: '32', value: 32}, {show: '33', value: 33}, {show: '34', value: 34}, {show: '35', value: 35},
            {show: '36', value: 36}, {show: '37', value: 37}, {show: '38', value: 38}, {show: '39', value: 39},
            {show: '40', value: 40}, {show: '41', value: 41}, {show: '42', value: 42}, {show: '43', value: 43},
            {show: '44', value: 44}, {show: '45', value: 45}, {show: '46', value: 46}, {show: '47', value: 47},
            {show: '48', value: 48}, {show: '49', value: 49}, {show: '50', value: 50}, {show: '51', value: 51},
            {show: '52', value: 52}, {show: '53', value: 53}, {show: '54', value: 54}, {show: '55', value: 55},
            {show: '56', value: 56}, {show: '57', value: 57}, {show: '58', value: 58}, {show: '59', value: 59}
          ]
        },
        etapas: {
          loaded: false,
          amount: 6,
          names: ['Preguntas', 'Respuestas', 'Recepción de Ofertas',
            'Evaluación Técnica', 'Evaluación Comercial', 'Resultados'],
          save_names: ['questions', 'answers', 'reception', 'technicalEvaluation', 'economicalEvaluation', 'results'],
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
            show: true,
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
        this.bidding.bases.files.push(file)
        this.bidding.bases.show = false
      },
      async deleteBidding () {
        usersApi.deleteBidding(this.loadedBidding)
      },
      async addBidding () {
        this.checkBiddingInput()
        if (!this.bidding.generalError) {
          const bidding = this.parseBidding()
          await this.createUsers(bidding.users)
          const self = this
          if (this.modify) {
            usersApi.updateBidding(bidding, this.loadedBidding).then(res => {
              if (!res) {
                self.$emit('endModal', null)
                location.reload()
              }
            })
          } else {
            usersApi.registerBidding(bidding).then(res => {
              if (!res) {
                self.$emit('endModal', null)
                location.reload()
              }
            })
          }
        }
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
      isEmpty (list) {
        let value
        for (let i = 0; i < list.length; ++i) {
          value = list[i]
          if (!value.mail) {
            return true
          }
        }
        return false
      },
      checkBiddingInput () {
        this.etapas.error = !this.etapas.payload || !this.etapas.payload[0].dateOne || !this.etapas.payload[0].dateTwo
        this.bidding.company.error = !this.bidding.company.payload
        this.bidding.name.error = !this.bidding.name.payload
        this.bidding.requests.error = this.bidding.requests.amount > 0 && !this.bidding.requests.payload[0]
        this.bidding.users.error = this.isEmpty(this.bidding.users.payload)
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
        let bidding = {
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
            let techStart
            let techEnd
            for (let i = 0; i < self.etapas.payload.length; ++i) {
              const dateTable = self.etapas.payload[i]
              let stage = {
                title: dateTable.title,
                save_name: dateTable.save_name
              }
              if (dateTable.save_name !== 'results') {
                stage['start'] = self.parseDate(dateTable.dateOne, dateTable.timeOne)
                stage['end'] = self.parseDate(dateTable.dateTwo, dateTable.timeTwo)
              } else {
                stage['date'] = self.parseDate(dateTable.dateOne, dateTable.timeOne)
              }
              if (dateTable.save_name === 'technicalEvaluation') {
                techStart = stage.start
                techEnd = stage.end
              }
              stages.push(stage)
            }
            if (self.bidding.type === '1') {
              let stage = {
                title: 'Evaluación Comercial',
                save_name: 'economicalEvaluation',
                start: techStart,
                end: techEnd
              }
              stages.push(stage)
            }
            return stages
          })(),
          items: this.bidding.requests.payload
        }
        return bidding
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
        let start = 0
        if (this.bidding.users.payload.length < this.bidding.users.amount) {
          start = this.bidding.users.payload.length
          for (let i = start; i < this.bidding.users.amount; ++i) {
            let user
            if (this.modify && i < this.loadedBidding.users.length) {
              user = {
                mail: this.loadedBidding.users[i].user.email,
                role: {
                  cliente: this.loadedBidding.users[i].role === 'client',
                  ingeniero: this.loadedBidding.users[i].role === 'engineer',
                  proveedor:
                  this.loadedBidding.users[i].role !== 'engineer' && this.loadedBidding.users[i].role !== 'client'
                },
                error: false,
                errorMessage: '',
                isNew: false,
                password: ''
              }
            } else {
              user = {
                mail: '',
                role: {
                  cliente: false,
                  ingeniero: false,
                  proveedor: false
                },
                error: false,
                errorMessage: '',
                isNew: false,
                password: ''
              }
            }
            this.bidding.users.payload.push(user)
          }
        } else {
          this.bidding.users.payload.splice(this.bidding.users.amount,
            this.bidding.users.payload.length - this.bidding.users.amount)
        }
        return this.bidding.users.payload
      },
      buildRequest: function () {
        let start = 0
        if (this.bidding.requests.payload.length < this.bidding.requests.amount) {
          start = this.bidding.requests.payload.length
          for (let i = start; i < this.bidding.requests.amount; ++i) {
            let request
            if (this.modify && i < this.loadedBidding.economicalForm.length) {
              request = this.loadedBidding.economicalForm[i]
            } else {
              request = {
                itemName: '',
                wantedAmount: '',
                measureUnit: ''
              }
            }
            this.bidding.requests.payload.push(request)
          }
        } else {
          this.bidding.requests.payload.splice(this.bidding.requests.amount,
            this.bidding.requests.payload.length - this.bidding.requests.amount)
        }
        return this.bidding.requests.payload
      },
      availableStages: function () {
        if (this.etapas.loaded) {
          return this.etapas.payload
        }
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
          if (this.bidding.type === '1' && stage.save_name === 'economicalEvaluation') continue
          stages.push(stage)
        }
        this.etapas.payload = stages
        return this.etapas.payload
      }
    },
    beforeMount () {
      if (this.modify) {
        this.caption = 'Modificar'
        if (this.loadedBidding.biddingType) {
          this.bidding.type = String(this.loadedBidding.biddingType)
        }
        if (this.loadedBidding.title) {
          this.bidding.name.payload = this.loadedBidding.title
        }
        if (this.loadedBidding.bidderCompany) {
          this.bidding.company.payload = this.loadedBidding.bidderCompany
        }
        if (this.loadedBidding.rules) {
          this.bidding.bases.text = this.loadedBidding.rules.summary
        }
        if (this.loadedBidding.economicalForm) {
          this.bidding.requests.amount = this.loadedBidding.economicalForm.length
        }
        if (this.loadedBidding.users) {
          this.bidding.users.amount = this.loadedBidding.users.length
        }
        let parseDate = function (date) {
          let year = date.getFullYear()
          let month = date.getMonth() + 1
          let day = date.getDate() + 1
          return year + '-' + month + '-' + day
        }
        if (this.loadedBidding.deadlines) {
          this.etapas.loaded = true
          for (let i = 0; i < this.etapas.amount; ++i) {
            let startDate = null
            if (this.etapas.save_names[i] !== 'results') {
              startDate = new Date(this.loadedBidding.deadlines[this.etapas.save_names[i]].start)
            } else {
              startDate = new Date(this.loadedBidding.deadlines[this.etapas.save_names[i]].date)
            }
            let stage = {
              title: this.etapas.names[i],
              save_name: this.etapas.save_names[i],
              label: 'etapa' + i,
              placeholder: 'Selecciona duración del Período',
              dateOne: parseDate(startDate),
              timeOne: {
                hour: startDate.getHours(),
                minute: startDate.getMinutes()
              },
              id: 'datepicker-trigger' + (i + 1)
            }
            if (this.etapas.save_names[i] !== 'results') {
              let endDate = new Date(this.loadedBidding.deadlines[this.etapas.save_names[i]].end)
              stage['dateTwo'] = parseDate(endDate)
              stage['timeTwo'] = {
                hour: endDate.getHours(),
                minute: endDate.getMinutes()
              }
            } else {
              stage['dateTwo'] = ''
              stage['timeTwo'] = {
                hour: 0,
                minute: 0
              }
            }
            this.etapas.payload.push(stage)
          }
        }
      }
    }
  }
</script>

<style>
</style>
