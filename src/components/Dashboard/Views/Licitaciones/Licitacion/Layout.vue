<template>
  <div class="full-height">
    <div class="flex-container" v-if="bidding">
      <!-- TITLE -->
      <div class="flex-row"><h1 class="title">{{ bidding.name }}</h1></div>
      <!-- SUMMARY -->
      <div class="flex-row" v-if="bidding.rulesSummary"><p class="rules-summary">{{ bidding.rulesSummary }}</p></div>
      <!-- TIMELINE -->
      <!-- <div class="flex-row"></div> -->
      <!-- RULES -->
      <div class="flex-row" v-if="uploadRules || downloadRules">
        <Participants class="flex-row-item"
                      :participants="bidding.participants"/>
        <FileDownloadCard class="flex-row-item"
                          :iconColor="'#f49521'"
                          :buttonColor="'#f49521'"
                          :files="bidding.rulesFiles"
                          title="Descargar bases"
                          v-if="downloadRules"/>
        <TextAreaButtonCard class="flex-row-item" :title="'Publicar Aviso'"/>
      </div>
      <!-- OFFERS: Download or upload the offers of the bidding -->
      <div class="flex-row" v-if="uploadTecOffer || uploadEcoOffer || downloadTecOffers || downloadEcoOffers">
        <FileInputCard class="flex-row-item" :title="'Subir Oferta Técnica'" @uploaded="handleUploadedTecOffer"
                       v-if="uploadTecOffer"/>
        <FileDownloadCard class="flex-row-item" :title="'Descargar Oferta Técnica'"
                          :files="bidding.tecOffers"
                          v-if="downloadTecOffers">Descargar Oferta Técnica
        </FileDownloadCard>
        <FileInputCard class="flex-row-item" :title="'Subir Oferta Económica'" @uploaded="handleUploadedEcoOffer"
                       :iconColor="'#d319a7'"
                       :buttonColor="'#d319a7'"
                       v-if="uploadEcoOffer"/>
        <FileDownloadCard class="flex-row-item" :title="'Descargar Oferta Económica'"
                          :iconColor="'#d319a7'"
                          :buttonColor="'#d319a7'"
                          :files="bidding.ecoOffers"
                          v-if="downloadEcoOffers">Descargar Oferta Económica
        </FileDownloadCard>
      </div>
      <!-- FINAL RESULT OF THE BIDDING -->
      <!--
      <div class="flex-row" v-if="seeResult">
        <div class="flex-row-item">Resultado</div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
  /* Components */
  import FileDownloadCard from '../../../../UIComponents/Inputs/FileDownloadCard'
  import FileInputCard from 'src/components/UIComponents/Inputs/FileInputCard'
  import Participants from './Components/Participants'
  import TextAreaButtonCard from '../../../../UIComponents/Inputs/TextAreaButtonCard'
  /* Api */
  import api from 'src/api/index'

  export default {
    components: {
      FileDownloadCard,
      FileInputCard,
      Participants,
      TextAreaButtonCard
    },
    data () {
      return {
        bidding: undefined,
        uploadTecOffer: false,
        uploadEcoOffer: false,
        downloadTecOffers: false,
        downloadEcoOffers: false,
        seeResult: false,
        giveResult: false,
        uploadRules: false,
        downloadRules: false
      }
    },
    methods: {
      showProviderComponents: function (self) {
        self.downloadRules = true
        if (self.bidding.stages === 1) {
          if (self.bidding.step === 2) {
            self.uploadTecOffer = true
            self.uploadEcoOffer = true
          }
          if (self.bidding.step >= 3) {
            self.downloadTecOffers = true
            self.downloadEcoOffers = true
          }
          if (self.bidding.step === 4) {
            self.seeResult = true
          }
        } else {
          if (self.bidding.step === 2) {
            self.uploadTecOffer = true
          }
          if (self.bidding.step >= 3) {
            self.downloadTecOffers = true
          }
          if (self.bidding.step === 4) {
            self.uploadEcoOffer = true
          }
          if (self.bidding.step === 5) {
            self.seeResult = true
            self.downloadEcoOffers = true
          }
        }
      },
      showAdminComponents: function (self) {
        self.downloadEcoOffers = true
        self.downloadTecOffers = true
        self.giveResult = true
        self.uploadRules = true
      },
      handleUploadedTecOffer: function (url, fileName) {
        // TODO: que pasa si el proveedor quiere sobreescribir un archivo anterior?
        const newTecOffer = {
          fileName: fileName,
          url: url,
          user: {
            /* I assume that I receive only my user if I'm a provider */
            id: this.bidding.users[0].id
          }
        }
        this.bidding.tecOffers.append(newTecOffer)
        // TODO: PUT to API adding a new downloadable file
      },
      handleUploadedEcoOffer: function (url, fileName) {
        // TODO: que pasa si el proveedor quiere sobreescribir un archivo anterior?
        const newEcoOffer = {
          fileName: fileName,
          url: url,
          user: {
            /* I assume that I receive only my user if I'm a provider */
            id: this.bidding.users[0].id
          }
        }
        this.bidding.ecoOffers.append(newEcoOffer)
        // TODO: PUT to API adding a new downloadable file
      }
    },
    created: function () {
      const self = this
      api.getCurrentBidding().then(data => {
        self.bidding = data
        /* Check permissions to see components */
        if (self.bidding.bidderCompany.length === 0) {
          self.showProviderComponents(self)
        } else {
          self.showAdminComponents(self)
        }
      }).catch(err => {
        console.error(err)
        /* The user is not authorized to access here */
        self.$router.push('/')
      })
    }
  }
</script>

<style scoped>
  .flex-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10%;
    padding: 0;
    justify-content: space-around;
  }

  .flex-row-item {
    flex-grow: 1;
    padding: 5px;
    margin-top: 10px;
    text-align: center;
  }

  .flex-container {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }

  .full-height {
    min-height: 100vh;
  }

  .rules-summary {
    margin: 0 20px 20px;
  }

  .title {
    font-weight: 400;
    color: #616161;
  }
</style>
