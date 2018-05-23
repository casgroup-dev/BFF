<template>
  <ul class="flex-container">
    <ul class="flex-row">
      <Title class="flex-row-item" :title="bidding.name"></Title>
      <div class="flex-row-item"></div>
      <div class="flex-row-item">Time Remaining</div>
    </ul>
    <ul class="flex-row">
      <div class="flex-row-item">Timeline</div>
    </ul>
    <ul class="flex-row" v-if="uploadRules || downloadRules">
      <FileInputCard class="flex-row-item" :title="'Subir Bases'" :iconColor="'#22a045'" v-if="uploadRules"
                     @uploaded="handleUploadedRules"></FileInputCard>
      <div class="flex-row-item" v-if="downloadRules">Descargar Bases</div>
    </ul>
    <ul class="flex-row" v-if="uploadTecOffer || uploadEcoOffer || downloadTecOffers || downloadEcoOffers">
      <FileInputCard class="flex-row-item" :title="'Subir Oferta Técnica'" v-if="uploadTecOffer"
                     @uploaded="handleUploadedTecnicalOffer"></FileInputCard>
      <div class="flex-row-item" v-if="downloadTecOffers">Descargar Oferta Técnica</div>
      <FileInputCard class="flex-row-item" :title="'Subir Oferta Económica'" :iconColor="'#D32F2F'" v-if="uploadEcoOffer"
                     @uploaded="handleUploadedEconomicOffer"></FileInputCard>
      <div class="flex-row-item" v-if="downloadEcoOffers">Descargar Oferta Económica</div>
    </ul>
    <ul class="flex-row" v-if="seeResult">
      <div class="flex-row-item">Resultado</div>
    </ul>
  </ul>
</template>

<script>
  import Title from './Components/Title'
  import Participants from './Components/Participants'
  import FileInputCard from 'src/components/UIComponents/Inputs/FileInputCard'
  import usersApi from 'src/apis/users'
  export default {
    name: 'Layout',
    components: {
      FileInputCard,
      Title
    },
    data () {
      return {
        bidding: {
          name: {type: String},
          bidderCompany: {type: String},
          users: [{
            id: {type: String},
            role: {type: String},
            password: {type: String}
          }],
          bases: [{type: String}],
          periods: [{
            start: {type: String},
            end: {type: String}
          }],
          step: {type: Number},
          stages: {type: Number}
        },
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
      handleUploadedRules: function (url) {

      },
      handleUploadedTecnicalOffer: function (url) {

      },
      handleUploadedEconomicOffer: function (url) {

      }
    },
    created: function () {
      const self = this
      usersApi.getCurrentBidding().then(data => {
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
  .flex-row{
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

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
  }

</style>
