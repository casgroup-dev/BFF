<template>
  <Card>
    <div slot="header">
      <h2 class="title text-center">Registro de usuario</h2>
    </div>
    <div class="block">
      <label>Nombre</label>
      <fg-input class="col-12" placeholder="Juan Pérez González" @enter="login"/>
    </div>
    <div class="block">
      <label>Correo electrónico</label>
      <fg-input class="col-12" placeholder="ejemplo@ejemplo.com" @enter="login"/>
    </div>
    <div class="block">
      <label>Empresa</label>
      <fg-input class="col-12" placeholder="CasGroup" @enter="login"/>
    </div>
    <div class="block">
      <!-- TODO change dropdown menu style -->
      <label>Rol</label>
      <select class="col-12" v-model="selected">
        <option disabled value="">Por favor elija uno</option>
        <option>Administrador</option>
        <option>Proveedor</option>
        <option>Consultor</option>
      </select>
    </div>
    <div class="block">
      <label>Teléfono</label>
      <fg-input class="col-12" placeholder="+56 9 1234 5678" @enter="login"/>
    </div>
    <div class="block">
      <label>Contraseña</label>
      <fg-input class="col-12" placeholder="****" @enter="login"/>
    </div>
    <div align="center">
      <button class="btn btn-info btn-fill" @click="login" v-if="!loading">Registrar</button>
    </div>


    <p>¿Qué deberían hacer?</p>
    <ul>
      <li>Basándose en el formulario de login poner los elementos correspondientes (inputs, textos y botones).</li>
      <li>Completar las funciones para el llamado a la api de registro.</li>
      <li>Mostrar mensaje de errores si los hay.</li>
      <li>Mostrar mensaje de éxito y pedir que revise su email (esta no lo hacemos aún, pero igual).</li>
      <li>Mostrar spinner mientras responde la api.</li>
      <li>Bindear en dos direcciones (con 'v-model') los datos del componente para el registro.</li>
      <li>Verificar que no está enviando campos vacíos.</li>
      <li>Extra: Manejar qué pasa cuando se apreta enter.</li>
      <li>Extra: Autofocus al carga el componente en el primer input.</li>
    </ul>
  </Card>
</template>

<script>
  import Card from '../../UIComponents/Cards/Card'
  import usersApi from '../../../apis/users'

  export default {
    name: 'form',
    components: {
      Card
    },
    data () {
      return {}
    },
    methods: {
      /**
       * Check that the data of the form is filled (not empty values) and call the register API.
       */
      register () {
        throw new Error('Not implemented.')
      }
    }
  }
</script>

<style scoped></style>
