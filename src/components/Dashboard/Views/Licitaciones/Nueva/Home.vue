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
        <div class="form-group col-2"> <!-- PENDIENTE corregir alineación -->
          <label>Numero de Usuarios Asociados</label>
          <fg-input v-model="bidding.users.amount"></fg-input>
        </div>
        <div class="form-group">
          <small><label class="error" style="color: red;"
                        v-if="bidding.users.error">{{bidding.users.errorMessage}}</label></small>
          <div class="form-row" v-for="user in usersAndRoles">
            <div class="form-group col-md-4">
              <fg-input placeholder="Usuario" v-model="user.name"></fg-input>
            </div>
            <div class="form-group col-md-4">
              <select v-model="user.role">
                <option disabled value="">Seleccione el Rol</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-group col-2"> <!-- PENDIENTE corregir alineación -->
          <label>Numero de Periodos</label>
          <fg-input v-model="periodos.amount"></fg-input>
        </div>
        <div class="form-group">
          <small><label class="error" style="color: red;"
                        v-if="periodos.error">{{periodos.errorMessage}}</label></small>
          <table>
            <td v-for="period in periodAvailables">
              <label :for="period.label">{{period.title}}</label>
              <div>
                <div class="datepicker-trigger">
                  <input
                    type="text"
                    :id="period.id"
                    :placeholder="period.placeholder"
                    :value="formatDates(period.dateOne, period.dateTwo)">
                  <AirbnbStyleDatepicker
                    :trigger-element-id="period.id"
                    :mode="'range'"
                    :fullscreen-mobile="true"
                    :date-one="period.dateOne"
                    :date-two="period.dateTwo"
                    @date-one-selected="val => { period.dateOne = val }"
                    @date-two-selected="val => { period.dateTwo = val }">
                  </AirbnbStyleDatepicker>
                </div>
              </div>
            </td>
          </table>
        </div>
        <!--<div class="custom-file">-->
        <!--<input type="file" class="custom-file-input" id="customFile">-->
        <!--<label class="custom-file-label" for="customFile">Subir versión completa Licitación</label>-->
        <!--</div>-->
        <br><br>
        <button type="submit" class="btn btn-primary" @click="addBidding">Crear</button>
      </form>
    </div>
  </div>
</template>

<script>
  import format from 'date-fns/format'
  export default {
    data () {
      return {
        dateFormat: 'D MMM',
        periodos: {
          amount: 3,
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
            amount: 1,
            payload: [],
            error: false,
            errorMessage: ''
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
      addBidding () {
        if (!this.periodos.payload || !this.periodos.payload[0].dateOne || !this.periodos.payload[0].dateTwo) {
          this.periodos.error = true
          this.periodos.errorMessage = 'Debe definir las fechas de la Licitación'
        } else this.periodos.error = false
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
        if (!this.bidding.users.payload || !this.bidding.users.payload[0].name) {
          this.bidding.users.error = true
          this.bidding.users.errorMessage = 'Debe designar al menos un encargado a la Licitación'
        } else this.bidding.users.error = false
        const self = this
        const bidding = {
          name: this.bidding.name,
          company: this.bidding.company,
          users: this.bidding.users,
          bases: this.bidding.bases,
          periods: (function () {
            let periods = []
            for (let i = 0; i < self.periodos.amount; ++i) {
              const dateTable = self.periodos.payload[i]
              let period = {
                dateOne: dateTable.dateOne,
                dateTwo: dateTable.dateTwo
              }
              periods.push(period)
            }
            return periods
          })()
        }
        //  TODO call api
      }
    },
    computed: {
      usersAndRoles: function () {
        let users = []
        for (let i = 1; i <= this.bidding.users.amount; ++i) {
          let user = {
            name: '',
            role: ''
          }
          users.push(user)
        }
        this.bidding.users.payload = users
        return this.bidding.users.payload
      },
      periodAvailables: function () {
        let periodos = []
        for (let i = 1; i <= this.periodos.amount; ++i) {
          let period = {
            title: 'Período ' + i,
            label: 'periodo' + i,
            placeholder: 'Selecciona duración del Periodo',
            dateOne: '',
            dateTwo: '',
            id: 'datepicker-trigger' + i
          }
          periodos.push(period)
        }
        this.periodos.payload = periodos
        return this.periodos.payload
      }
    }
  }
</script>

<style>
</style>
