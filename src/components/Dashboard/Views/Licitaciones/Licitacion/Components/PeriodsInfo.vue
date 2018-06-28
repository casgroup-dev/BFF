<template>
  <card>
    <template slot="header">
      <h3>Fechas</h3>
      <p>Ten presente que hoy es {{ today }}</p>
      <button class="btn btn-primary" @click="tableOrParagraph = !tableOrParagraph">Cambiar vista</button>
    </template>
    <template>
      <!-- <div class="text" style="text-align: left" v-for="period in parsePeriods">
         <template v-if="period.name !== 'Visita técnica'">
           <i v-bind:class="` fa ${selectCalendarIcon(period)}`"></i>
           <b>{{period.name}}</b>
           {{period.first}}
           <b>{{period.start}}</b>
           {{period.second}}
           <b>{{period.end}}.</b>
         </template>
         </div> -->
      <p class="text" style="text-align: left" v-for="(period, index) in deadlines" v-if="!tableOrParagraph"
           :key="index">
        <i v-bind:class="` fa ${selectCalendarIcon(period)}`"></i>
        <b>{{period.name}}</b>
        comienza el
        <b>{{period.start}} {{period.date}}</b>
        y termina el
        <b>{{period.end}} {{period.date}}.</b>
      </p>

      <table class="table table-striped" v-if="tableOrParagraph">
        <thead>
        <th>Período</th>
        <th>Abierto desde</th>
        <th>Fecha límite</th>
        </thead>
        <tbody>
        <tr v-for="(period, index) in deadlines" :key="index">
          <td>
            <i v-bind:class="` fa ${selectCalendarIcon(period)}`"></i>
            {{period.name}}
          </td>
          <td v-if="period.start">{{formatDate(period.start)}}</td>
          <td v-if="period.end">{{formatDate(period.end)}}</td>
          <td v-if="period.date">{{formatDate(period.date)}}</td>
          <td v-if="period.date">{{formatDate(period.date)}}</td>
        </tr>
        </tbody>
      </table>

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
        tableOrParagraph: true,
        today: (new Date()).toLocaleString('es-ES', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
      }
    },
    props: {
      deadlines: {
        type: Object,
        default: [
          {name: 'Período 1', start: '2017/01/01 00:00', end: '2017/12/31 23:59'},
          {name: 'Período 2', start: '2018/01/01', end: '2018/01/15'},
          {name: 'Período 3', start: '2018/01/16', end: '2018/07/10'},
          {name: 'Período 4', start: '2018/07/11', end: '2018/07/30'},
          {name: 'Período 5', date: '2018/07/31'}
        ]
      }
    },
    methods: {
      formatDate: (date) => {
        const dateFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }
        let stringDate = (new Date(date)).toLocaleDateString('es-ES', dateFormatOptions).replace(',', '')
        return stringDate.charAt(0).toUpperCase() + stringDate.slice(1)
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
