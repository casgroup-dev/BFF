<template>
  <Card class="text-center">
    <h2 slot="header" class="title">Login</h2>
    <label class="error" v-if="username.error">Necesitas ingresar un usuario</label>
    <fg-input class="col-12" placeholder="Usuario" v-model="username.payload"/>
    <label class="error" v-if="password.error">Necesitas ingresar una contraseña</label>
    <fg-input class="col-12" placeholder="Contraseña" type="password" v-model="password.payload"/>
    <button class="btn btn-info btn-fill" @click="login">Entrar</button>
  </Card>
</template>

<script>
  import Card from '../../UIComponents/Cards/Card'
  import usersApi from '../../../apis/users/index'

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
        }
      }
    },
    components: {
      Card
    },
    methods: {
      async login () {
        if (!this.username.payload) this.username.error = true
        if (!this.password.payload) this.password.error = true
        if (this.username.payload && this.password.payload) {
          this.username.error = false
          this.password.error = false
          const token = await usersApi.login(this.username, this.password)
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
