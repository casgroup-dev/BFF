<template>
  <Card>
    <div slot="header">
      <h1 class="title text-center">Registro</h1>
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
