<template>
  <div class="container-fluid">
    <div class="row align-items-center">
      <!-- TECHNICAL -->
      <div class="col">
        <!-- INPUT -->
        <file-input-card class="flex-1"
                         title="Subir oferta técnica"
                         iconColor="#5C6BC0"
                         buttonColor="#5C6BC0"
                         multiple
                         @uploaded="putTechnicalOffer"/>
        <!-- UPLOADED FILES -->
        <list-files-card :files="files.technicals"/>
      </div>
      <!-- ECONOMICAL -->
      <div v-if="showEconomicalOfferInputCard" class="col">
        <!-- INPUT -->
        <file-input-card v-if="showEconomicalOfferInputCard"
                         class="flex-1"
                         title="Subir oferta económica"
                         iconColor="#42A5F5"
                         buttonColor="#42A5F5"
                         multiple
                         @uploaded="putEconomicalOffer"/>
        <!-- UPLOADED FILES -->
        <list-files-card :files="files.economicals"/>
      </div>
    </div>
  </div>
</template>

<script>
  import FileInputCard from '../../../../../UIComponents/Inputs/FileInputCard'
  import ListFilesCard from './ListFilesCard'

  export default {
    components: {
      FileInputCard,
      ListFilesCard
    },
    data () {
      return {
        files: {economicals: [], technicals: []}
      }
    },
    props: {
      /**
       * Boolean that indicates if the economical offer must be shown.
       */
      showEconomicalOfferInputCard: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      /**
       * Puts the technical offer's url and name into the backend.
       * @param {String} url
       * @param {String} filename
       */
      putTechnicalOffer (url, filename) {
        // TODO: Call api
      },
      /**
       * Puts the ecnomical offer's url and name into the backend.
       * @param {String} url
       * @param {String} filename
       */
      putEconomicalOffer (url, filename) {
        // TODO: Call api
      }
    },
    created: () => {
      // TODO: Call api and get files
    }
  }
</script>

<style scoped>

</style>
