import Vue from 'vue'
import App from './App.vue'
import LightBootstrap from './plugins/light-bootstrap-dashboard'
import router from './router'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/styles.css'

// see docs for available options
const datepickerOptions = {
  days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  daysShort: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  texts: {
    apply: 'Guardar',
    cancel: 'Cancelar'
  }
}

// make sure we can use it in our components
Vue.use(AirbnbStyleDatepicker, datepickerOptions)
Vue.use(LightBootstrap)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
