<template>
  <Card>
    <div slot="header">
      <h2 class="title text-center">Registro de usuario</h2>
    </div>
    <label class="error" v-if="registerErrorMessage">{{registerErrorMessage}}</label>
    <label align="center-block" class="error" v-if="name.error">Ingrese su nombre</label>
    <div class="block">
      <fg-input class="col-12" placeholder="Juan Pérez González" v-model="name.payload" @enter="register">
        <label slot="label">Nombre</label></fg-input>
    </div>
    <label align="center-block" class="error" v-if="email.error">Ingrese una dirección de correo</label>
    <div class="block">
      <!-- TODO check email format -->
      <fg-input class="col-12" placeholder="ejemplo@ejemplo.com" type="email" v-model="email.payload" @enter="register">
        <label slot="label">Correo electrónico</label></fg-input>
    </div>
    <label class="error" v-if="company.error">Ingrese el nombre de su empresa</label>
    <div class="form-group">
      <fg-input class="col-12" placeholder="CasGroup" v-model="company.payload" @enter="register">
        <label slot="label">Empresa</label></fg-input>
    </div>
    <div class="block">
      <fg-input class="col-12" placeholder="+56 9 1234 5678" v-model="phone.payload" @enter="register">
        <label slot="label">Teléfono</label></fg-input>
    </div>
    <label class="error" v-if="password.error">Ingrese una contraseña</label>
    <div class="block">
      <fg-input class="col-12" placeholder="******" type="password" v-model="password.payload" @enter="register">
        <label slot="label">Contraseña</label></fg-input>
    </div>
    <label class="error" v-if="passwordConfirm.error">Confirme la contraseña</label>
    <div class="block">
      <!-- TODO check matching passwords -->
      <fg-input class="col-12" placeholder="******" type="password" v-model="passwordConfirm.payload" @enter="register">
        <label slot="label">Confirmar contraseña</label></fg-input>
    </div>
    <label class="error" v-if="differentPasswordsError">Contraseñas no coinciden</label>
    <div align="center">
      <button class="btn btn-info btn-fill" @click="register" v-if="registerButton">Registrar</button>
    </div>
    <clip-loader :loading="loading" color="#1DC7EA"/>
    <div class="alert alert-success" v-if="successMessage">
      Registrado con éxito. Un mail para la verificación de su cuenta ha sido enviado.
    </div>
    <div class="col-12" align="center">
      <router-link :to="{ name: 'login', query: {next: this.$route.query.next}}">
        Volver a login.
      </router-link>
    </div>
  </Card>
</template>

<script>
  import Card from '../../UIComponents/Cards/Card'
  import usersApi from '../../../apis/users'
  import ClipLoader from 'vue-spinner/src/ClipLoader'

  export default {
    name: 'Register',
    data () {
      return {
        name: {payload: null, error: false},
        email: {payload: null, error: false},
        company: {payload: null, error: false},
        phone: {payload: null, error: false},
        password: {payload: null, error: false},
        passwordConfirm: {payload: null, error: false},
        registerButton: true,
        loading: false,
        successMessage: false,
        success: false,
        differentPasswordsError: false,
        registerErrorMessage: null
      }
    },
    components: {
      Card,
      ClipLoader
    },
    methods: {
      /**
       * Check that the data of the form is filled (not empty values) and call the register API.
       */
      async register () {
        if (!this.name.payload){ // TODO Obligatorio?
          this.name.error = true
        }
        if (!this.email.payload){
          this.email.error = true
        }
        if (!this.company.payload){
          this.company.error = true
        }
        if (!this.phone.payload){ // TODO Obligatorio?
          this.phone.error = true
        }
        if (!this.password.payload) {
          this.password.error = true
        }
        if (!this.passwordConfirm.payload) {
          this.passwordConfirm.error = true
        }
        if (this.name.payload && this.email.payload && this.company.payload && this.password.payload && this.passwordConfirm.payload &&
          (this.passwordConfirm.payload === this.password.payload)) {
          this.loading = true
          this.registerButton = false
          usersApi.register(this.name.payload, this.email.payload, this.company.payload, this.role.payload, this.phone.payload, this.password.payload, this.passwordConfirm.payload)
            .then(function () {
              this.successMessage = true
              this.registerErrorMessage = false
            }.bind(this))
            .catch(function (err) {
              this.registerErrorMessage = err.message || 'Hubo un error, lamentamos la situación.'
              this.registerButton = true
            }.bind(this))
            .then(function () { this.loading = false }.bind(this))
        }
      },
      /**
       * Focus the first input element of the form.
       */
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
