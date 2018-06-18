<template>
    <button class="btn btn-fill btn-round btn-lg btn-primary" @click="participate">
      Participar de la Licitación</button>
</template>

<script>
    export default {
      name: 'Enter',
      methods: {
        participate: function () {
          console.log('participar')
        }
      }
    }
</script>

<style scoped>

</style>
