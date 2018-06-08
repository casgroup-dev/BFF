<template>
  <card class="container-fluid">
    <div class="row text-center"><h3 class="title col">{{ title }}</h3></div>
    <hr class="no-margin">
    <!-- TABLE -->
    <table class="table" v-if="Object.keys(files).length">
      <thead>
      <tr>
        <th class="text-center">Proveedor</th>
        <th class="text-center">Archivo</th>
        <th class="text-center">Aprobados</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(providerFiles, provider) in files" :key="provider">
        <td>{{ provider }}</td>
        <td>
          <ul class="no-margin">
            <li v-for="(file, index) in providerFiles" :key="index">
              <a :href="file.url" download>{{ file.name }}</a>
            </li>
          </ul>
        </td>
        <td>
          <p-checkbox/>
        </td>
      </tr>
      </tbody>
    </table>
    <h5 class="title" v-else style="margin: 50px;">No hay ofertas aún que mostrar.</h5>
  </card>
</template>

<script>
  import Card from '../CardV2'
  import PCheckbox from '../../../../../UIComponents/Inputs/Checkbox'

  export default {
    components: {
      PCheckbox,
      Card
    },
    props: {
      /**
       * Title of the card.
       */
      title: {
        type: String,
        required: true
      },
      /**
       * Files per provider. Example:
       * {
       *   'Microsoft': [{name: 'file', url: 'https://www.copec.cl/file.pdf'}, ...]
       *   ...
       * }
       */
      files: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped src="../assets/title.css"></style>
<style scoped>
  .no-margin {
    margin: 0;
  }
</style>
