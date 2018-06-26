<template>
  <card class="container-fluid">
    <div class="row text-center"><h3 class="title col">{{ title }}</h3></div>
    <!-- TABLE -->
    <table class="table" v-if="providers.length">
      <thead>
      <tr>
        <th>Proveedor</th>
        <th>Archivos</th>
        <th v-if="showApprovement">Aprobados</th>
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
        <td v-if="showApprovement">
          <p-checkbox v-model="provider.approved"/>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- Message if there is no provider -->
    <h4 class="text-center" v-else style="margin: 50px;">No hay ofertas aún que mostrar.</h4>
    <!-- APPROVE BUTTON -->
    <div class="row text-center" v-if="showApprovement">
      <div class="col">
        <button class="btn btn-primary"
                @click="emitApproveSelected">
          <i class="fa fa-check"></i> Aprobar ofertas técnicas de los seleccionados
        </button>
      </div>
    </div>
  </card>
</template>

<script>
  import Card from '../../../../../UIComponents/Cards/CardV2'
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
      showApprovement: {
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
        const selected = this.providers.filter(p => p.approved)
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
