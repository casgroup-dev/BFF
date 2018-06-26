<template>
  <card>
    <template slot="header">
      <h3>Fechas</h3>
      <p>Ten presente que hoy es {{ today }}</p>
    </template>
    <template>
      <div class="text" style="text-align: left" v-for="(period, index) in deadlines" :key="index">
        <i v-bind:class="` fa ${selectCalendarIcon(period)}`"></i>
        <b>{{period.name}}</b>
        comienza el
        <b>{{formatDate(period.start)}}</b>
        y termina el
        <b>{{formatDate(period.end)}}.</b>

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
        type: Array,
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
        return date.toLocaleDateString('es-ES', dateFormatOptions).replace(',', '')
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
