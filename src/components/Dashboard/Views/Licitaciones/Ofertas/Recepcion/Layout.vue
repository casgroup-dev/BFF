<template>
  <div class="container-fluid">
    <div class="row">
      <!-- TECHNICAL -->
      <div class="col">
        <!-- INPUT FILES -->
        <file-input-card class="flex-1"
                         :title="`Subir oferta técnica`"
                         iconColor="#5C6BC0"
                         buttonColor="#5C6BC0"
                         multiple
                         @uploaded="putTechnicalOffer"/>
        <!-- UPLOADED FILES -->
        <list-files-card :files="documents.technicals"
                         @delete="file => deleteDocument(file, 'technical')"/>
      </div>
      <!-- ECONOMICAL -->
      <div class="col">
        <!-- FORM BUTTON -->
        <button-card text="Tabla oferta económica"
                     icon="fa-book"
                     @click="toggleEconomicalFormModal"/>
        <!-- INPUT FILES -->
        <file-input-card class="flex-1"
                         title="Subir anexos oferta económica"
                         iconColor="#42A5F5"
                         buttonColor="#42A5F5"
                         multiple
                         @uploaded="putEconomicalOffer"/>
        <!-- UPLOADED FILES -->
        <list-files-card :files="documents.economicals"
                         @delete="file => deleteDocument(file, 'economical')"/>
      </div>
    </div>
    <!-- ECONOMICAL FORM MODAL -->
    <economical-form-modal v-show="showEconomicalOfferModal"
                           :bidding-id="bidding.id"
                           :items="economicalFormWithAnswers"
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
        showEconomicalOfferModal: false,
        updatedDocuments: null
      }
    },
    props: {
      bidding: {
        type: Object,
        required: true
      }
    },
    computed: {
      documents () {
        return this.updatedDocuments || this.user.documents
      },
      user () {
        return this.bidding.users[0]
      },
      economicalFormWithAnswers () {
        if (!this.bidding) return []
        return this.bidding.economicalForm.map(item => {
          let answers = this.user.economicalFormAnswers.find(answer => answer.itemName === item.itemName)
          return {...item, ...answers}
        })
      }
    },
    methods: {
      /**
       * Puts the technical offer's url and name into the backend.
       * @param {String} url
       * @param {String} filename
       */
      putTechnicalOffer (url, filename) {
        api.putDocument(this.bidding.id, 'technical', filename, url)
          .then(() => this.getMyDocuments())
          .catch(err => console.error(err))
      },
      /**
       * Puts the economical offer's url and name into the backend.
       * @param {String} url
       * @param {String} filename
       */
      putEconomicalOffer (url, filename) {
        api.putDocument(this.bidding.id, 'economical', filename, url)
          .then(() => this.getMyDocuments())
          .catch(err => console.error(err))
      },
      /**
       * Get the files' names and urls of the user from the backend.
       */
      getMyDocuments () {
        api.getMyDocuments(this.bidding.id).then(response => {
          console.log(response)
          this.updatedDocuments = {economicals: response.economical, technicals: response.technical}
        })
      },
      /**
       * Deletes a file from the backend.
       * @params {Object} file - Object with the files properties.
       * @params {String} file.name - Name of the file to delete.
       * @params {String} type - Type of the document to delete (economical or technical).
       */
      deleteDocument (file, type) {
        api.deleteDocument(this.bidding.id, file.name, type).then(() => this.getMyDocuments())
      },
      /**
       * Shows or hide the modal that contains the form to upload the economical offers table.
       */
      toggleEconomicalFormModal () {
        this.showEconomicalOfferModal = !this.showEconomicalOfferModal
      }
    }
  }
</script>

<style scoped>

</style>
