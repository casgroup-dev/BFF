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
        <PostNoticeParent class="flex-row-item"
                          :bidding="{id: '5b182e54ab51ac1c24d49b53'}"/>
        <NoticesList class="flex-row-item"
                                  :bidding="{id: '5b182e54ab51ac1c24d49b53',
                                             questions: [{id: '5b30755a6e2f222ea04502ce',
                                                          question: 'Puedo llevar los 10 barcos que tengo?',
                                                          answer: ''},
                                                         {id: '5b3075696e2f222ea04502cf',
                                                          question: 'Puedo comerme la torta?',
                                                          answer: ''},
                                                         {id: '5b3075c06e2f222ea04502d0',
                                                          question: 'Qué le pasaría a pinocho si dice me va a crecer la nariz?',
                                                          answer: ''}],
                                             notices: [{id: '5b302a557941bf3dcc5f620c',
                                                         notice: 'intento 1',
                                                         date: '2018-06-24'},
                                                        {id: '5b30658b7941bf3dcc5f620d',
                                                         notice: 'intento 2',
                                                         date: '2018-06-25'},
                                                        {id: '5b306bea6e2f222ea04502cd',
                                                         notice: 'hola a todos los jiles',
                                                         date: '2018-06-25'},
                                                         {id: '5b302a557941bf3dcc5f620c',
                                                         notice: 'intento 1',
                                                         date: '2018-06-24'},
                                                        {id: '5b30658b7941bf3dcc5f620d',
                                                         notice: 'intento 2',
                                                         date: '2018-06-25'},
                                                        {id: '5b306bea6e2f222ea04502cd',
                                                         notice: 'hola a todos los jiles',
                                                         date: '2018-06-25'}]}"/>
        <PostQuestionParent class="flex-row-item"
                            :bidding="{id: '5b182e54ab51ac1c24d49b53'}"/>
      </div>
      <!-- OFFERS: Download or upload the offers of the bidding -->
      <div class="flex-row">
        <QuestionsAndAnswersListing class="flex-row-item"
                                    :bidding="{id: '5b182e54ab51ac1c24d49b53',
                                             questions: [{id: '5b30755a6e2f222ea04502ce',
                                                          question: 'Puedo llevar los 10 barcos que tengo?',
                                                          answer: 'callate voh vieja culia'},
                                                         {id: '5b3075696e2f222ea04502cf',
                                                          question: 'Puedo comerme la torta?',
                                                          answer: ''},
                                                         {id: '5b3075c06e2f222ea04502d0',
                                                          question: 'Qué le pasaría a pinocho si dice me va a crecer la nariz?',
                                                          answer: 'callate voh vieja culia x2'}],
                                             notices: [{id: '5b302a557941bf3dcc5f620c',
                                                         notice: 'intento 1',
                                                         date: '2018-06-24'},
                                                        {id: '5b30658b7941bf3dcc5f620d',
                                                         notice: 'intento 2',
                                                         date: '2018-06-25'},
                                                        {id: '5b306bea6e2f222ea04502cd',
                                                         notice: 'hola a todos los jiles',
                                                         date: '2018-06-25'},
                                                         {id: '5b302a557941bf3dcc5f620c',
                                                         notice: 'intento 1',
                                                         date: '2018-06-24'},
                                                        {id: '5b30658b7941bf3dcc5f620d',
                                                         notice: 'intento 2',
                                                         date: '2018-06-25'},
                                                        {id: '5b306bea6e2f222ea04502cd',
                                                         notice: 'hola a todos los jiles',
                                                         date: '2018-06-25'}]}"/>
      </div>
      <div class="flex-row">
        <AnswerQuestionsTextareas class="flex-row-item"
                                  :bidding="{id: '5b182e54ab51ac1c24d49b53',
                                             questions: [{id: '5b30755a6e2f222ea04502ce',
                                                          question: 'Puedo llevar los 10 barcos que tengo?',
                                                          answer: ''},
                                                         {id: '5b3075696e2f222ea04502cf',
                                                          question: 'Puedo comerme la torta?',
                                                          answer: ''},
                                                         {id: '5b3075c06e2f222ea04502d0',
                                                          question: 'Qué le pasaría a pinocho si dice me va a crecer la nariz?',
                                                          answer: ''}],
                                             notices: [{id: '5b302a557941bf3dcc5f620c',
                                                         notice: 'intento 1',
                                                         date: '2018-06-24'},
                                                        {id: '5b30658b7941bf3dcc5f620d',
                                                         notice: 'intento 2',
                                                         date: '2018-06-25'},
                                                        {id: '5b306bea6e2f222ea04502cd',
                                                         notice: 'hola a todos los jiles',
                                                         date: '2018-06-25'},
                                                         {id: '5b302a557941bf3dcc5f620c',
                                                         notice: 'intento 1',
                                                         date: '2018-06-24'},
                                                        {id: '5b30658b7941bf3dcc5f620d',
                                                         notice: 'intento 2',
                                                         date: '2018-06-25'},
                                                        {id: '5b306bea6e2f222ea04502cd',
                                                         notice: 'hola a todos los jiles',
                                                         date: '2018-06-25'}]}"/>
      </div>
      <!-- FINAL RESULT OF THE BIDDING -->

      <div class="flex-row" v-if="seeResult">
        <!-- When a provider is requesting info, only his data is in users array -->
        <Results class="flex-row-item" :awarded="bidding.users[0].awarded"
                 :award-comment="bidding.users[0].awardComment"
                 :details="bidding.users[0].economicalFormAnswers">
        </Results>
      </div>

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
  import Results from './Components/Results'
  import AnswerQuestionsTextareas from '../Questions/AnswerQuestionsTextareas'
  import QuestionsAndAnswersListing from '../Questions/QuestionsAndAnswersListing'
  import NoticesList from '../Notices/NoticesList'
  /* Api */
  import api from 'src/api/index'
  export default {
    components: {
      NoticesList,
      FileDownloadCard,
      FileInputCard,
      Participants,
      PostQuestionParent,
      PostNoticeParent,
      Results,
      AnswerQuestionsTextareas,
      QuestionsAndAnswersListing
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
