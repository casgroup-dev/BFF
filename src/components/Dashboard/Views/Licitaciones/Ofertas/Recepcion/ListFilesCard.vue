<template>
  <card class="text-center">
    <div v-if="files.length">
      <h3 class="title">Archivos subidos</h3>
      <table class="table">
        <thead>
        <tr>
          <th class="text-center">#</th>
          <th class="text-center">Archivo</th>
          <th class="text-center">Fecha</th>
          <th class="text-center">Eliminar</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(file, index) in files" :key="index">
          <td>{{ index + 1 }}</td>
          <td><a :href="file.url" download>{{ file.name }}</a></td>
          <td>{{ new Date(file.date).toLocaleString() }}</td>
          <td>
            <button class="btn btn-round btn-xs"
                    title="Eliminar archivo"
                    @click="emitDeleteEvent(file)">
              <i class="fa fa-times"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h3 class="title" style="margin: 10px;">No has subido ningún archivo aún.</h3>
    </div>
  </card>
</template>

<script>
  import Card from '../CardV2'

  export default {
    components: {
      Card
    },
    props: {
      /**
       * Array with objects as {name: String, url: String}.
       */
      files: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      /**
       * Emits an event to show the intention of deleting a file.
       * @param {Object} file - File object.
       * @param {String} file.name - Name of the file to delete.
       */
      emitDeleteEvent (file) {
        this.$emit('delete', file)
      }
    }
  }
</script>

<style scoped src="../assets/title.css"></style>
<style scoped>
  .table th {
    text-align: center !important;
  }
</style>
