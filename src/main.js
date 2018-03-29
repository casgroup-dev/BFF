import Vue from 'vue'
import App from './App.vue'
import LightBootstrap from './plugins/light-bootstrap-dashboard'
import router from './router'

Vue.use(LightBootstrap)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
