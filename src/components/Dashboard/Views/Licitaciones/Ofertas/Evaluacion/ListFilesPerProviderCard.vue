<template>
  <card class="container-fluid">
    <div class="row text-center"><h3 class="title col">{{ title }}</h3></div>
    <hr class="no-margin">
    <!-- TABLE -->
    <table class="table" v-if="providers.length">
      <thead>
      <tr>
        <th class="text-center">Proveedor</th>
        <th class="text-center">Archivos</th>
        <th class="text-center">Aprobados</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(provider, index) in providers" :key="index">
        <td>{{ provider.provider }}</td>
        <td>
          <!-- List documents -->
          <ul class="no-margin" v-if="provider.documents.length">
            <li v-for="(file, index) in provider.documents" :key="index">
              <a :href="file.url" download>{{ file.name }}</a>
            </li>
          </ul>
          <!-- Show message if there is no document -->
          <h5 class="title" v-else>No presentó documentos.</h5>
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
       * Array with objects as {provider: String, documents: [{name: String, url: String, date: Date}]}
       */
      providers: {
        type: Array,
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
