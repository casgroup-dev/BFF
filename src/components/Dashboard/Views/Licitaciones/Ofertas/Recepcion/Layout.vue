<template>
  <div class="container-fluid">
    <div class="row">
      <!-- TECHNICAL -->
      <div class="col">
        <!-- INPUT FILES -->
        <file-input-card class="flex-1"
                         :title="`Subir oferta ${showEconomicalOffer ? 'técnica': ''}`"
                         iconColor="#5C6BC0"
                         buttonColor="#5C6BC0"
                         multiple
                         @uploaded="putTechnicalOffer"/>
        <!-- UPLOADED FILES -->
        <list-files-card :files="files.technicals"/>
      </div>
      <!-- ECONOMICAL -->
      <div v-if="showEconomicalOffer" class="col">
        <!-- FORM BUTTON -->
        <button-card text="Tabla oferta económica"
                     icon="fa-book"
                     @click="toggleEconomicalFormModal"/>
        <!-- INPUT FILES -->
        <file-input-card v-if="showEconomicalOffer"
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
    <!-- ECONOMICAL FORM MODAL -->
    <economical-form-modal v-show="showEconomicalOfferModal"
                           :bidding-id="biddingId"
                           @close="toggleEconomicalFormModal"/>
  </div>
</template>

<script>
  import api from '../../../../../../api/biddings/documents'
  import ButtonCard from './ButtonCard'
  import Card from '../CardV2'
  import FileInputCard from '../../../../../UIComponents/Inputs/FileInputCard'
  import ListFilesCard from './ListFilesCard'
  import EconomicalFormModal from './EconomicalFormModal'

  export default {
    components: {
      ButtonCard,
      Card,
      FileInputCard,
      ListFilesCard,
      EconomicalFormModal
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
        default: '5b16e5d99142d57f6de4e767'
      },
      /**
       * Boolean that indicates if the economical offer must be shown.
       */
      showEconomicalOffer: {
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
