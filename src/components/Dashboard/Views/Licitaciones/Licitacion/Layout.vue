<template>
  <div class="full-height">
    <div class="flex-container" v-if="bidding">
      <!-- TITLE -->
      <div class="flex-row"><h1 class="title">{{ bidding.title }}</h1></div>
      <!-- RULES -->
      <div class="flex-row">
        <p class="rules-summary">{{ bidding.rules.summary }}</p>
      </div>
      <!-- TIMELINE -->
      <!-- <div class="flex-row"></div> -->
      <!-- Participants -->
      <div class="flex-row" v-if="bidding.permissions.seeParticipants">
        <Participants class="flex-row-item"
                      :participants="participantsComponentUsers"/>
        <!-- <CreateNotice class="flex-row-item"/> -->
      </div>
      <!-- FINAL RESULT OF THE BIDDING -->
      <!--
      <div class="flex-row" v-if="seeResult">
        <div class="flex-row-item">Resultado</div>
      </div>
      -->
      <div class="flex-row" v-if="bidding.permissions.canModify">
        <Evaluacion class="flex-row-item"></Evaluacion>
      </div>
      <div class="flex-row">
        <Recepcion class="flex-row-item" v-if="!bidding.permissions.canModify" :biddingId=bidding.id
        :showEconomicalOffer=bidding.permissions.uploadEconomical></Recepcion>
      </div>
    </div>
  </div>
</template>

<script>
  /* Components */
  import FileDownloadCard from '../../../../UIComponents/Inputs/FileDownloadCard'
  import FileInputCard from 'src/components/UIComponents/Inputs/FileInputCard'
  import Participants from './Components/Participants'
  import CreateNotice from './Components/CreateNotice'
  import Evaluacion from 'src/components/Dashboard/Views/Licitaciones/Ofertas/Evaluacion/Layout'
  import Recepcion from 'src/components/Dashboard/Views/Licitaciones/Ofertas/Recepcion/Layout'

  /* Api */
  import api from 'src/api/index'

  export default {
    components: {
      FileDownloadCard,
      FileInputCard,
      Participants,
      CreateNotice,
      Evaluacion,
      Recepcion
    },
    props: ['id'],
    data () {
      return {
        bidding: undefined,
        participantsComponentUsers: []
      }
    },
    methods: {
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
      api.getCurrentBidding(self.id).then(data => {
        self.bidding = data
        var users = Object.assign([], data.users)
        delete users['documents']
        delete users['economicalFormAnswers']
        self.participantsComponentUsers = Object.assign([], data.users)
      }).catch(err => {
        console.error(err)
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
