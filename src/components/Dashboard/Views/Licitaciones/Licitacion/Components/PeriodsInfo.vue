<template>
  <card>
    <template slot="header">
      <h3>Fechas</h3>
      <p>Ten presente que hoy es {{ today }}</p>
    </template>
    <template>
      <div class="text" style="text-align: left" v-for="period in parsePeriods">
        <template v-if="period.name !== 'Visita técnica'">
          <i v-bind:class="` fa ${selectCalendarIcon(period)}`"></i>
          <b>{{period.name}}</b>
          {{period.first}}
          <b>{{period.start}}</b>
          {{period.second}}
          <b>{{period.end}}.</b>
        </template>
      </div>
    </template>
    <template slot="footer"></template>
  </card>

</template>

<script>

  import Card from 'src/components/UIComponents/Cards/Card'

  export default {
    name: 'PeriodsInfo',
    components: {
      Card
    },
    data: () => {
      return {
        today: (new Date()).toLocaleString('es-ES', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
      }
    },
    props: {
      deadlines: {
        type: Object,
        default: [
          {name: 'Período 1', start: new Date('2017/01/01'), end: new Date('2017/12/31')},
          {name: 'Período 2', start: new Date('2018/01/01'), end: new Date('2018/01/15')},
          {name: 'Período 3', start: new Date('2018/01/16'), end: new Date('2018/07/10')},
          {name: 'Período 4', start: new Date('2018/07/11'), end: new Date('2018/07/30')}
        ]
      }
    },
    methods: {
      formatDate: (date) => {
        const dateFormatOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
        return (new Date(date)).toLocaleDateString('es-ES', dateFormatOptions).replace(',', '')
      },

      selectCalendarIcon: (period) => {
        const currentDate = Date.now()
        if (currentDate > period.end) {
          return 'fa-calendar-check-o'
        }
        else if (currentDate < period.start) {
          return 'fa-calendar-times-o'
        } else {
          return 'fa-calendar-minus-o'
        }
      }
    },
    computed: {
      parsePeriods() {
        let period
        let parsedPeriod
        let parsedPeriods = []
        for (let key in this.deadlines) {
          period = this.deadlines[key]
          if (period.name !== 'Publicación de resultados') {
            parsedPeriod = {
              name: period.name,
              first: 'comienza el ',
              start: this.formatDate(period.start),
              second: 'y termina el ',
              end: this.formatDate(period.end)
            }
          }
          else {
            parsedPeriod = {
              name: period.name,
              first: 'Se entregan los resultados el ',
              start: this.formatDate(period.date),
              second: '',
              end: ''
            }
          }
          parsedPeriods.push(parsedPeriod)
        }
        return parsedPeriods
      }
    }
  }
</script>

<style scoped>

  .card {
    text-align: center;
  }

  .fa-calendar-minus-o {
    color: blue;
  }

  .fa-calendar-times-o {
    color: gray;
  }

</style>
