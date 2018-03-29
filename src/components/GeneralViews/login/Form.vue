<template>
  <Card class="text-center">
    <h2 slot="header" class="title">Login</h2>
    <p>Bienvenido al portal de CasGroup, por favor ingresa tu usuario y contraseña.</p>
    <label class="error" v-if="username.error">Necesitas ingresar un usuario</label>
    <fg-input class="col-12" placeholder="Usuario" v-model="username.payload"/>
    <label class="error" v-if="password.error">Necesitas ingresar una contraseña</label>
    <fg-input class="col-12" placeholder="Contraseña" type="password" v-model="password.payload"/>
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
        username: {
          payload: null,
          error: false
        },
        password: {
          payload: null,
          error: false
        },
        loading: false
      }
    },
    components: {
      Card,
      ClipLoader
    },
    methods: {
      async login () {
        if (!this.username.payload) this.username.error = true
        if (!this.password.payload) this.password.error = true
        if (this.username.payload && this.password.payload) {
          this.username.error = false
          this.password.error = false
          this.loading = true
          const token = await usersApi.login(this.username, this.password)
          this.loading = false
          localStorage.setItem('token', token)
          this.$router.push(this.$route.query.next || '/')
        }
      }
    }
  }
</script>

<style scoped>
  label.error {
    color: #ff0000
  }
</style>
