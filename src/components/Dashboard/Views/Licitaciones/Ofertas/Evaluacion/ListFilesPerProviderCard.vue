<template>
  <card class="container-fluid">
    <div class="row text-center"><h3 class="title col">{{ title }}</h3></div>
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
          <p-checkbox v-model="provider.selected"/>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- Message if there is no provider -->
    <h5 class="title" v-else style="margin: 50px;">No hay ofertas aún que mostrar.</h5>
    <!-- APPROVE BUTTON -->
    <div class="row text-center" v-if="showApproveButton">
      <div class="col">
        <button class="btn btn-fill btn-primary"
                @click="emitApproveSelected">
          <i class="fa fa-check"></i> Aprobar ofertas técnicas de los seleccionados
        </button>
      </div>
    </div>
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
      },
      showApproveButton: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      /**
       * Emit an event to indicate that the user is approving the selected providers. Pass the selected providers
       * with the event.
       */
      emitApproveSelected () {
        const selected = this.providers.filter(p => p.selected)
        if (!selected.length) return alert('No has seleccionado a nadie.')
        this.$emit('approve', selected)
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
