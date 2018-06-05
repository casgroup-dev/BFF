<template>
  <div class="container-fluid">
    <div class="row align-items-center">
      <!-- TECHNICAL -->
      <div class="col">
        <!-- INPUT FILES -->
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
        <!-- FORM BUTTON -->
        <button-card text="Responder oferta económica"
                     icon="fa-book"
                     @click="toggleEconomicalFormModal"/>
        <!-- INPUT FILES -->
        <file-input-card v-if="showEconomicalOfferInputCard"
                         class="flex-1"
                         title="Subir anexos oferta económica"
                         iconColor="#42A5F5"
                         buttonColor="#42A5F5"
                         multiple
                         @uploaded="putEconomicalOffer"/>
        <!-- UPLOADED FILES -->
        <list-files-card :files="files.economicals"/>
      </div>
    </div>
    <modal v-if="showEconomicalOfferModal">
      <!-- TODO: ECONOMICAL FORM -->
    </modal>
  </div>
</template>

<script>
  import api from '../../../../../../api/biddings/documents'
  import ButtonCard from './ButtonCard'
  import Card from './CardV2'
  import FileInputCard from '../../../../../UIComponents/Inputs/FileInputCard'
  import ListFilesCard from './ListFilesCard'
  import Modal from './../../../../../UIComponents/Modal/Modal'

  export default {
    components: {
      ButtonCard,
      Card,
      FileInputCard,
      ListFilesCard,
      Modal
    },
    data () {
      return {
        files: {economicals: [], technicals: []},
        showEconomicalOfferModal: false
      }
    },
    props: {
      /**
       * Id of the actual bidding.
       */
      biddingId: {
        type: String,
        required: true
      },
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
        api.putDocument(this.biddingId, 'technical', filename, url).catch(err => console.error(err))
      },
      /**
       * Puts the economical offer's url and name into the backend.
       * @param {String} url
       * @param {String} filename
       */
      putEconomicalOffer (url, filename) {
        api.putDocument(this.biddingId, 'economical', filename, url).catch(err => console.error(err))
      },
      /**
       * Shows or hide the modal that contains the form to upload the economical offers table.
       */
      toggleEconomicalFormModal () {
        this.showEconomicalOfferModal = !this.showEconomicalOfferModal
      }
    },
    created: () => {
      // TODO: Call api and get files
    }
  }
</script>

<style scoped>

</style>
