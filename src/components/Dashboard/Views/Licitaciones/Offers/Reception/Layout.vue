<template>
  <div class="offers-container">
    <!-- Technical offer -->
    <file-input-card class="flex-item"
                     title="Subir oferta técnica"
                     iconColor="#5C6BC0"
                     buttonColor="#5C6BC0"
                     multiple
                     @uploaded="putTechnicalOffer"/>
    <!-- Economical offer -->
    <file-input-card v-if="showEconomicalOfferInputCard"
                     class="flex-item"
                     title="Subir oferta económica"
                     iconColor="#42A5F5"
                     buttonColor="#42A5F5"
                     multiple
                     @uploaded="putEconomicalOffer"/>
  </div>
</template>

<script>
  import FileInputCard from '../../../../../UIComponents/Inputs/FileInputCard'

  export default {
    components: {
      FileInputCard
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
    }
  }
</script>

<style scoped>
  .offers-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  .flex-item {
    flex-grow: 1;
  }
</style>
