<template>
  <Card>
    <div slot="header">
      <!-- TODO title disappears after pressing register D: -->
      <h2 class="title text-center">Registro de usuario</h2>
    </div>
    <label align="center-block" class="error" v-if="name.error">Ingrese su nombre</label>
    <div class="block">
      <label>Nombre*</label>
      <fg-input class="col-12" placeholder="Juan Pérez González" v-model="name.payload" @enter="register"/>
    </div>
    <label align="center-block" class="error" v-if="email.error">Ingrese una dirección de correo</label>
    <div class="block">
      <!-- TODO check email format -->
      <label>Correo electrónico*</label>
      <fg-input class="col-12" placeholder="ejemplo@ejemplo.com" type="email" v-model="email.payload" @enter="register"/>
    </div>
    <label class="error" v-if="company.error">Ingrese el nombre de su empresa</label>
    <div class="form-group">
      <label>Empresa*</label>
      <fg-input class="col-12" placeholder="CasGroup" v-model="company.payload" @enter="register"/>
    </div>
    <label class="error" v-if="role.error">Ingrese su rol</label>
    <div class="block">
      <!-- TODO change dropdown menu style -->
      <label>Rol*</label>
      <select class="col-12" v-model="role.payload">
        <option disabled value="">Por favor elija uno</option>
        <option>Administrador</option>
        <option>Proveedor</option>
        <option>Consultor</option>
      </select>
    </div>
    <div class="block">
      <label>Teléfono</label>
      <fg-input class="col-12" placeholder="+56 9 1234 5678" v-model="phone.payload" @enter="register"/>
    </div>
    <label class="error" v-if="password.error">Ingrese una contraseña</label>
    <div class="block">
      <label>Contraseña*</label>
      <fg-input class="col-12" placeholder="******" type="password" v-model="password.payload" @enter="register"/>
    </div>
    <label class="error" v-if="passwordConfirm.error">Confirme la contraseña</label>
    <div class="block">
      <!-- TODO check matching passwords -->
      <label>Confirmar contraseña*</label>
      <fg-input class="col-12" placeholder="******" type="password" v-model="passwordConfirm.payload" @enter="register"/>
    </div>
    <div align="center">
      <button class="btn btn-info btn-fill" @click="register" v-if="!loading">Registrar</button>
    </div>
    <clip-loader :loading="loading" color="#1DC7EA"/>

    <p>¿Qué deberían hacer?</p>
    <ul>
      <li><del>Basándose en el formulario de login poner los elementos correspondientes (inputs, textos y botones).</del></li>
      <li><del>Completar las funciones para el llamado a la api de registro.</del></li>
      <li><del>Mostrar mensaje de errores si los hay.</del></li>
      <li>Mostrar mensaje de éxito y pedir que revise su email (esta no lo hacemos aún, pero igual).</li>
      <li><del>Mostrar spinner mientras responde la api.</del></li>
      <li><del>Bindear en dos direcciones (con 'v-model') los datos del componente para el registro.</del></li>
      <li><del>Verificar que no está enviando campos vacíos.</del></li>
      <li>Extra: Manejar qué pasa cuando se apreta enter.</li>
      <li><del>Extra: Autofocus al carga el componente en el primer input.</del></li>
    </ul>
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
        role: {payload: null, error: false},
        phone: {payload: null, error: false},
        password: {payload: null, error: false},
        passwordConfirm: {payload: null, error: false},
        loading: false,
        loginErrorMessage: null
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
        this.name.error = !this.name.payload
        this.email.error = !this.email.payload
        this.company.error = !this.company.payload
        this.role.error = !this.role.payload
        this.phone.error = !this.phone.payload
        this.password.error = !this.password.payload
        this.passwordConfirm.error = !this.passwordConfirm.payload
        this.differentPasswordsError = !!(this.password.payload && this.passwordConfirm.payload && !(this.passwordConfirm.payload === this.password.payload))
        if (this.name.payload && this.email.payload && this.company.payload && this.password.payload && this.passwordConfirm.payload &&
          (this.passwordConfirm.payload === this.password.payload)) {
          this.loading = true
          usersApi.register(this.name.payload, this.email.payload, this.company.payload, this.role.payload, this.phone.payload, this.password.payload, this.passwordConfirm.payload)
            .then(function () {
              this.$router.push(this.$route.query.next || '/')
            }.bind(this))
            .catch(function (err) {
              this.loginErrorMessage = err.message || 'Hubo un error, lamentamos la situación.'
              this.name.payload = this.email.payload = this.company.payload = this.role.payload = this.phone.payload = this.password.payload = this.passwordConfirm.payload = null
              this.focus()
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
  .margin-top {
    margin-top: 10px
  }
  .text-gray {
    color: #889494
  }
</style>
