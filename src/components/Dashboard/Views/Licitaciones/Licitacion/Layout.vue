<template>
  <div class="full-height">
    <div class="flex-container" v-if="bidding">
      <!-- TITLE -->
      <div class="flex-row">
        <h1 class="title">{{ bidding.title }}</h1>
      </div>
      <!-- BUTTONS -->
      <div class="col-10" style="text-align: right; font-size: xx-large">
        <!-- NEW BIDDING -->
        <button class="btn btn-primary" @click="modalOn = true">Modificar Licitación</button>
      </div>
      <!-- RULES -->
      <div class="flex-row" v-if="bidding.rules.summary">
        <p class="rules-summary">{{ bidding.rules.summary }}</p>
      </div>
      <!-- TIMELINE -->
      <!-- <div class="flex-row"></div> -->
      <!-- Participants -->
      <div class="flex-row">
        <Participants class="flex-row-item" v-if="bidding.permissions.seeParticipants"
                      :participants="bidding.users"/>
        <CreateNotice class="flex-row-item" v-if="bidding.permissions.sendNotice"/>
      <div class="flex-row">
        <FileDownloadCard class="flex-row-item"
                          iconColor="#f49521" buttonColor="#f49521"
                          :files="bidding.rules.files" title="Descargar bases"/>
      </div>
      <!-- OFFERS: Download or upload the offers of the bidding -->
      <div class="flex-row">
        <Evaluacion class="flex-row-item" v-if="bidding.deadlines.onResults
                          && bidding.permissions.reviewTechnical && bidding.permissions.reviewEconomical"/>
      </div>
      <div class="flex-row">
        <Recepcion class="flex-row-item" :biddingId='bidding.id'
                   v-if="(bidding.deadlines.onTechnicalReception || bidding.deadlines.onEconomicalReception)
                          && bidding.permissions.uploadTechnical && bidding.permissions.uploadEconomical"/>
      </div>
      <Enter v-if="bidding.invite" :biddingId="bidding.id"></Enter>
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

  /* Api */
  import api from 'src/api/index'
  import Modal from 'src/components/UIComponents/Modal/Modal.vue'
  import CreateForm from 'src/components/Dashboard/Views/Licitaciones/CreateForm.vue'

  export default {
    components: {
      FileDownloadCard,
      FileInputCard,
      Participants,
      CreateNotice,
      Evaluacion,
      Recepcion,
      Modal,
      CreateForm,
      Enter
    },
    props: ['id'],
    data () {
      return {
        modalOn: false,
        bidding: undefined,
        participantsComponentUsers: []
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
