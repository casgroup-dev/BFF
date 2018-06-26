<template>
  <div class="full-height">
    <div class="flex-container" v-if="bidding">
      <Enter v-if="bidding.invite" :biddingId="bidding.id"></Enter>

      <!-- TITLE -->
      <div class="flex-row"><h1 class="title">{{ bidding.title }}</h1></div>
      <!-- BUTTONS -->
      <div class="col-10" style="text-align: right; font-size: xx-large">
        <!-- NEW BIDDING -->
        <button class="btn btn-primary" v-if="bidding.permissions.canModify"
                @click="modalOn = true">Modificar Licitación</button>
      </div>
      <!-- TIMELINE -->
      <!-- <div class="flex-row"></div> -->
      <!-- RULES -->
      <div class="flex-row">
        <p class="rules-summary" v-if="bidding.rules">{{ bidding.rules.summary }}</p>
      </div>
      <div class="flex-row">
        <PeriodsInfo :deadlines="bidding.deadlines"/>
        <FileDownloadCard class="flex-row-item"
                          iconColor="#f49521"
                          buttonColor="#f49521"
                          :files="bidding.rules.files"
                          title="Descargar bases"/>
      </div>

      <div class="flex-row">
        <Participants class="flex-row-item"
                      v-if="bidding.permissions.seeParticipants"
                      :participants="bidding.users"/>
         <PostNoticeParent v-if="bidding.permissions.sendNotice" class="flex-row-item"/>
      </div>

      <Evaluacion v-if="bidding.permissions.canModify && bidding.permissions.reviewTechnical" :bidding="bidding"
                  :show-economical-section="bidding.reviewEconomical"></Evaluacion>

      <Recepcion v-if="bidding.permissions.uploadTechnical && !bidding.invite" :bidding=bidding
                 :showEconomicalOffer=bidding.permissions.uploadEconomical></Recepcion>

      <!-- FINAL RESULT OF THE BIDDING -->
      <div class="flex-row" v-if="bidding.publishedResults">
        <!-- When a provider is requesting info, only his data is in users array -->
        <Results class="flex-row-item" :awarded="bidding.users[0].awarded"
                 :award-comment="bidding.users[0].awardComment"
                 :details="bidding.users[0].economicalFormAnswers">
        </Results>
      </div>

      <modal v-if="modalOn">
        <template slot="header">
          <h4 style="margin: 0">Modificar Licitación</h4>
          <button type="button" class="btn btn-round btn-default btn-sm" @click="modalOn = false">
            <span class="btn-label"><i class="fa fa-times"></i></span> Cerrar
          </button>
        </template>
        <template slot="body">
          <create-form v-on:endModal="modalOn = false" :modify="true" :loadedBidding="bidding"></create-form>
        </template>
      </modal>

    </div>
  </div>
</template>

<script>
  /* Components */
  import FileDownloadCard from '../../../../UIComponents/Inputs/FileDownloadCard'
  import FileInputCard from 'src/components/UIComponents/Inputs/FileInputCard'
  import Participants from './Components/Participants'
  import PostQuestionParent from '../Questions/PostQuestionParent'
  import PostNoticeParent from '../Notices/PostNoticeParent'
  import AnswerQuestionsTextareas from '../Questions/AnswerQuestionsTextareas'
  import QuestionsAndAnswersListing from '../Questions/QuestionsAndAnswersListing'
  import NoticesList from '../Notices/NoticesList'
  import Enter from './Components/Enter'
  import Evaluacion from 'src/components/Dashboard/Views/Licitaciones/Ofertas/Evaluacion/Layout'
  import Recepcion from 'src/components/Dashboard/Views/Licitaciones/Ofertas/Recepcion/Layout'
  import Results from './Components/Results'
  import PeriodsInfo from './Components/PeriodsInfo'

  /* Api */
  import api from 'src/api/index'
  import Modal from 'src/components/UIComponents/Modal/Modal.vue'
  import CreateForm from 'src/components/Dashboard/Views/Licitaciones/CreateForm.vue'

  export default {
    components: {
      NoticesList,
      FileDownloadCard,
      FileInputCard,
      Participants,
      Evaluacion,
      Recepcion,
      Modal,
      CreateForm,
      Enter,
      PeriodsInfo,
      PostQuestionParent,
      PostNoticeParent,
      Results,
      AnswerQuestionsTextareas,
      QuestionsAndAnswersListing
    },
    props: ['id'],
    data () {
      return {
        modalOn: false,
        bidding: Object,
        participantsComponentUsers: []
      }
    },
    created: async function () {
      const self = this
      this.bidding = await api.getCurrentBidding(self.id)
        .then(data => {
          return data
        })
        .catch(err => {
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
