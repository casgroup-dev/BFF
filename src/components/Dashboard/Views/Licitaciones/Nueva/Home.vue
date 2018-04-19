<template>
  <div class="content">
    <div class="container-fluid">
      <form>
        <div class="form-group">
          <label for="licitName">Nombre</label>
          <input type="text" class="form-control" id="licitName" placeholder="Nombre Licitación">
        </div>
        <div class="form-group">
          <label for="empresaAsociada">Empresa Autora</label>
          <input type="text" class="form-control" id="empresaAsociada" placeholder="CasGroup">
        </div>
        <div class="form-group">
          <label for="bases">Bases</label>
          <textarea class="form-control" id="bases" style="height: 150px;"></textarea>
          <small id="basesHelpBlock" class="form-text text-muted">
            Descripción de bases pendiente
          </small>
        </div>
        <div class="form-group">
          <table>
            <td v-for="periodo in periodos">
              <label :for="periodo.label">{{periodo.title}}</label>
              <div>
                <div class="datepicker-trigger">
                  <input
                    type="text"
                    :id="periodo.id"
                    :placeholder="periodo.placeholder"
                    :value="formatDates(periodo.dateOne, periodo.dateTwo)"
                  >
                  <AirbnbStyleDatepicker
                    :trigger-element-id="periodo.id"
                    :mode="'range'"
                    :fullscreen-mobile="true"
                    :date-one="periodo.dateOne"
                    :date-two="periodo.dateTwo"
                    @date-one-selected="val => { periodo.dateOne = val }"
                    @date-two-selected="val => { periodo.dateTwo = val }"
                  />
                </div>
              </div>
            </td>
          </table>
        </div>
        <button type="submit" class="btn btn-primary">Crear</button>
      </form>
    </div>
  </div>
</template>

<script>
  import format from 'date-fns/format'

  export default {
    data() {
      return {
        dateFormat: 'D MMM',
        periodos:{
          primer_periodo: {
            title: 'Primer Período',
            label: 'periodo1',
            placeholder: "Selecciona duración del primer Periodo",
            dateOne: '',
            dateTwo: '',
            id: 'datepicker-trigger1'
          },
          segundo_periodo: {
            title: 'Segundo Período',
            label: 'periodo2',
            placeholder: "Selecciona duración del segundo Periodo",
            dateOne: '',
            dateTwo: '',
            id: 'datepicker-trigger2'
          },
          tercer_periodo: {
            title: 'Tercer Período',
            label: 'periodo3',
            placeholder: "Selecciona duración del tercer Periodo",
            dateOne: '',
            dateTwo: '',
            id: 'datepicker-trigger3'
          }
        }
      }
    },
    methods: {
      formatDates(dateOne, dateTwo) {
        let formattedDates = ''
        if (dateOne) {
          formattedDates = format(dateOne, this.dateFormat)
        }
        if (dateTwo) {
          formattedDates += ' - ' + format(dateTwo, this.dateFormat)
        }
        return formattedDates
      }
    }
  }
</script>

<style>
</style>
