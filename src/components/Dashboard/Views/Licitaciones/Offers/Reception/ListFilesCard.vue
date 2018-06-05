<template>
  <card class="text-center">
    <div v-if="files.length">
      <h3 class="title">Archivos subidos</h3>
      <table class="table">
        <thead>
        <tr>
          <th class="text-center">#</th>
          <th class="text-center">Archivo</th>
          <th class="text-center">Eliminar</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(file, index) in files" :key="index">
          <th>{{ index + 1 }}</th>
          <th><a :href="file.url">{{ file.name }}</a></th>
          <th>
            <button class="btn btn-round btn-xs"
                    title="Eliminar archivo"
                    @click="deleteFile(file)">
              <i class="fa fa-times"></i>
            </button>
          </th>
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
  import Card from './CardV2'

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
      deleteFile (file) {
        console.log(file.name, file.url)
        // TODO: Call api to delete a file by the url
      }
    }
  }
</script>

<style scoped src="./assets/title.css"></style>
<style scoped>
  .table th {
    text-align: center !important;
  }
</style>
