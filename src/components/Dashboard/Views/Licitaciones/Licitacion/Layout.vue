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
      <FileInputCard class="flex-row-item" :title="'Subir Bases'" @uploaded="handleUploadedRules"
                     :iconColor="'#22a045'"
                     :buttonColor="'#22a045'"
                     v-if="uploadRules"></FileInputCard>
      <FileDownloadCard class="flex-row-item"
                        :iconColor="'#f49521'"
                        :buttonColor="'#f49521'"
                        :files="bidding.rules"
                        v-if="downloadRules">Descargar Bases</FileDownloadCard>
    </ul>
    <ul class="flex-row" v-if="uploadTecOffer || uploadEcoOffer || downloadTecOffers || downloadEcoOffers">
      <FileInputCard class="flex-row-item" :title="'Subir Oferta Técnica'" @uploaded="handleUploadedTecOffer"
                     v-if="uploadTecOffer"></FileInputCard>
      <FileDownloadCard class="flex-row-item" :title="'Descargar Oferta Técnica'"
                        :files="bidding.tecOffers"
                        v-if="downloadTecOffers">Descargar Oferta Técnica</FileDownloadCard>
      <FileInputCard class="flex-row-item" :title="'Subir Oferta Económica'" @uploaded="handleUploadedEcoOffer"
                     :iconColor="'#d319a7'"
                     :buttonColor="'#d319a7'"
                     v-if="uploadEcoOffer"></FileInputCard>
      <FileDownloadCard class="flex-row-item" :title="'Descargar Oferta Económica'"
                        :iconColor="'#d319a7'"
                        :buttonColor="'#d319a7'"
                        :files="bidding.ecoOffers"
                        v-if="downloadEcoOffers">Descargar Oferta Económica</FileDownloadCard>
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
  import FileDownloadCard from '../../../../UIComponents/Inputs/FileDownloadCard';
  export default {
    name: 'Layout',
    components: {
      FileDownloadCard,
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
          rules: [{
            fileName: {type: String},
            url: {type: String},
            user: {
              id: {type: String}
            }
          }],
          periods: [{
            start: {type: String},
            end: {type: String}
          }],
          step: {type: Number},
          stages: {type: Number},
          tecOffers: [{
            fileName: {type: String},
            url: {type: String},
            user: {
              id: {type: String}
            }
          }],
          ecoOffers: [{
            fileName: {type: String},
            url: {type: String},
            user: {
              id: {type: String}
            }
          }]
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
      handleUploadedRules: function (url, fileName) {
        this.bidding.rules.fileName = fileName
        this.bidding.rules.url = url
        // TODO: PUT to API and overwrite rules
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