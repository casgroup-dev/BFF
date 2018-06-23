<template>
  <div class="full-height">
    <div class="flex-container" v-if="bidding">
      <!-- TITLE -->
      <div class="flex-row"><h1 class="title">{{ bidding.title }}</h1></div>
      <!-- RULES -->
      <div class="flex-row">
        <p class="rules-summary" v-if="bidding.rules">{{ bidding.rules.summary }}</p>
      </div>
      <!-- TIMELINE -->
      <!-- <div class="flex-row"></div> -->
      <!-- Participants -->
      <div class="flex-row" v-if="bidding.permissions.seeParticipants">
        <Participants class="flex-row-item"
                      :participants="bidding.users"/>
        <!-- <CreateNotice class="flex-row-item"/> -->
      </div>
      <div class="flex-row" v-if="bidding.permissions.canModify">
        <Evaluacion class="flex-row-item"></Evaluacion>
      </div>
      <div class="flex-row">
        <Recepcion class="flex-row-item" v-if="!bidding.permissions.canModify && !bidding.invite" :biddingId=bidding.id
        :showEconomicalOffer=bidding.permissions.uploadEconomical></Recepcion>
      <!-- FINAL RESULT OF THE BIDDING -->

      <div class="flex-row" v-if="seeResult">
        <!-- When a provider is requesting info, only his data is in users array -->
        <Results class="flex-row-item" :awarded="bidding.users[0].awarded"
                 :award-comment="bidding.users[0].awardComment"
                 :details="bidding.users[0].economicalFormAnswers">
        </Results>
      </div>
      <Enter v-if="bidding.invite" :biddingId="bidding.id"></Enter>

    </div>
  </div>
</template>

<script>
  /* Components */
  import FileDownloadCard from '../../../../UIComponents/Inputs/FileDownloadCard'
  import FileInputCard from 'src/components/UIComponents/Inputs/FileInputCard'
  import Participants from './Components/Participants'
  import Enter from './Components/Enter'
  import CreateNotice from './Components/CreateNotice'
  import Evaluacion from 'src/components/Dashboard/Views/Licitaciones/Ofertas/Evaluacion/Layout'
  import Recepcion from 'src/components/Dashboard/Views/Licitaciones/Ofertas/Recepcion/Layout'

  import Results from './Components/Results'
  /* Api */
  import api from 'src/api/index'

  export default {
    components: {
      FileDownloadCard,
      FileInputCard,
      Participants,
      Evaluacion,
      Recepcion,
      Enter,
      CreateNotice,
      Results
    },
    props: ['id'],
    data () {
      return {
        bidding: undefined,
      }
    },
    created: function () {
      const self = this
      api.getCurrentBidding(self.id).then(data => {
        console.log(data)
        self.bidding = data
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
