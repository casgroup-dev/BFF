<template>
  <Card class="text-center">
    <h2 slot="header" class="title">Login</h2>
    <p>Bienvenido al portal de CasGroup, por favor ingresa tu usuario y contraseña.</p>
    <label class="error" v-if="loginErrorMessage">{{loginErrorMessage}}</label>
    <label class="error" v-if="email.error">Necesitas ingresar un email</label>
    <fg-input class="col-12" placeholder="ejemplo@ejemplo.com" v-model="email.payload" @enter="login"/>
    <label class="error" v-if="password.error">Necesitas ingresar una contraseña</label>
    <fg-input class="col-12" placeholder="Contraseña" type="password" v-model="password.payload" @enter="login"/>
    <button class="btn btn-info btn-fill" @click="login" v-if="!loading">Entrar</button>
    <clip-loader :loading="loading" color="#1DC7EA"/>
  </Card>
</template>

<script>
  import Card from '../../UIComponents/Cards/Card'
  import usersApi from '../../../apis/users/index'
  import ClipLoader from 'vue-spinner/src/ClipLoader'

  export default {
    data () {
      return {
        email: {payload: null, error: false},
        password: {payload: null, error: false},
        loading: false,
        loginErrorMessage: null
      }
    },
    components: {
      Card,
      ClipLoader
    },
    methods: {
      async login () {
        if (!this.email.payload) this.email.error = true
        if (!this.password.payload) this.password.error = true
        if (this.email.payload && this.password.payload) {
          this.email.error = this.password.error = false
          this.loading = true
          usersApi.login(this.email.payload, this.password.payload)
            .then(function () {
              this.$router.push(this.$route.query.next || '/')
            }.bind(this))
            .catch(function (err) {
              this.loginErrorMessage = err.message || 'Hubo un error, lamentamos la situación.'
              this.email.payload = this.password.payload = null
              this.focus()
            }.bind(this))
            .then(function () { this.loading = false }.bind(this))
        }
      },
      focus () {
        this.$el.querySelector('input').focus()
      }
    },
    mounted: function () { this.focus() }
  }
</script>

<style scoped>
  label.error {
    color: #ff0000
  }
</style>
