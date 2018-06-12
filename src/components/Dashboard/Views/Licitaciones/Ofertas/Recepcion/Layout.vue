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
        <list-files-card :files="files.technical"
                         @delete="file => deleteDocument(file, 'technical')"/>
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
        <list-files-card :files="files.economical"
                         @delete="file => deleteDocument(file, 'economical')"/>
      </div>
    </div>
    <!-- ECONOMICAL FORM MODAL -->
    <economical-form-modal v-show="showEconomicalOfferModal"
                           :bidding-id="biddingId"
                           :items="economicalForm"
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
        files: {economical: [], technical: []},
        showEconomicalOfferModal: false
      }
    },
    props: {
      /**
       * Id of the actual bidding.
       */
      biddingId: {
        type: String,
        default: '5b16e5d99142d57f6de4e767' // TODO: Change to required
      },
      /**
       * Array with the items to populate the economical form.
       */
      economicalForm: {
        type: Array,
        default: () => [
          {itemName: 'Pernos', wantedAmount: 500, measureUnit: 'Unidad', costPerUnit: 100, specifications: 'hola'},
          {itemName: 'Tuercas', wantedAmount: 100, measureUnit: 'Unidad'},
          {itemName: 'Lápices', wantedAmount: 150, measureUnit: 'Unidad'},
          {itemName: 'Cuadernos', wantedAmount: 100, measureUnit: 'Unidad'}
        ] // TODO: Change to required
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
        api.putDocument(this.biddingId, 'technical', filename, url)
          .then(() => this.getMyDocuments())
          .catch(err => console.error(err))
      },
      /**
       * Puts the economical offer's url and name into the backend.
       * @param {String} url
       * @param {String} filename
       */
      putEconomicalOffer (url, filename) {
        api.putDocument(this.biddingId, 'economical', filename, url)
          .then(() => this.getMyDocuments())
          .catch(err => console.error(err))
      },
      /**
       * Get the files' names and urls of the user from the backend.
       */
      getMyDocuments () {
        api.getMyDocuments(this.biddingId).then(response => { this.files = response })
      },
      /**
       * Deletes a file from the backend.
       * @params {Object} file - Object with the files properties.
       * @params {String} file.name - Name of the file to delete.
       * @params {String} type - Type of the document to delete (economical or technical).
       */
      deleteDocument (file, type) {
        api.deleteDocument(this.biddingId, file.name, type).then(() => this.getMyDocuments())
      },
      /**
       * Shows or hide the modal that contains the form to upload the economical offers table.
       */
      toggleEconomicalFormModal () {
        this.showEconomicalOfferModal = !this.showEconomicalOfferModal
      }
    },
    /**
     * After creation get the files of the user to show them in the correspondent component.
     */
    created: function () {
      this.getMyDocuments()
    }
  }
</script>

<style scoped>

</style>
