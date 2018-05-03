<template>
  <div class="content">
    <div class="container-fluid">
      <form>
        <div class="form-group">
          <label>Nombre Licitacion</label>
          <label class="error" v-if="bidding.name.error">{{bidding.name.errorMessage}}</label>
          <fg-input placeholder="Nombre Licitación" v-model="bidding.name.payload"></fg-input>
        </div>
        <div class="form-group">
          <label>Empresa Autora</label>
          <label class="error" v-if="bidding.company.error">{{bidding.company.errorMessage}}</label>
          <fg-input placeholder="CasGroup" v-model="bidding.company.payload"></fg-input>
        </div>
        <div class="form-group">
          <label>Bases</label>
          <label class="error" v-if="bidding.bases.error">{{bidding.bases.errorMessage}}</label>
          <textarea class="form-control" v-model="bidding.bases.payload" style="height: 150px;"></textarea>
          <small id="basesHelpBlock" class="form-text text-muted">
            Descripción de bases PENDIENTE
          </small>
        </div>
        <div class="form-group col-md-2"> <!-- PENDIENTE corregir alineación -->
          <label>Numero de Usuarios Asociados</label>
          <fg-input v-model="bidding.users.amount"></fg-input>
        </div>
        <div class="form-group">
          <div class="form-row" v-for="user in usersAndRoles">
            <div class="form-group col-md-4">
              <fg-input placeholder="Usuario" v-model="user.name"></fg-input>
            </div>
            <div class="form-group col-md-4">
              <select v-model="user.role" >
                <option disabled value="">Seleccione el Rol</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Numero de Periodos</label>
          <fg-input v-model="periodos.amount"></fg-input>
        </div>
        <div class="form-group">
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
                    @date-two-selected="val => { period.dateTwo = val }"></AirbnbStyleDatepicker>
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
          payload: []
        },
        bidding: {
          name: {
            payload: '',
            error: '',
            errorMessage: ''
          },
          company: {
            payload: '',
            error: '',
            errorMessage: ''
          },
          bases: {
            payload: '',
            error: '',
            errorMessage: ''
          },
          users: {
            amount: 1,
            payload: [],
            error: '',
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
        console.log(this.bidding)
      }
    },
    computed: {
      usersAndRoles: function () {
        let users = []
        for (let i = 1; i <= this.bidding.users.amount; ++i) {
          let user = {
            id: i,
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
