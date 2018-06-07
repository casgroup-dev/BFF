<template>
  <div class="container-fluid">
    <!-- TECHNICAL OFFERS -->
    <list-files-per-provider-card title="Ofertas técnicas"
                                  :providers="providersTechnicalDocuments"
                                  show-approve-button
                                  @approve="approveProviders"/>
    <template v-if="showEconomicalSection">
      <!-- ECONOMICAL COMPARISON -->
      <economical-comparison-card :items="items"
                                  :offers="offers"
                                  @adjudicate="adjudicate"/>
      <!-- ECONOMICAL OFFERS -->
      <list-files-per-provider-card title="Anexos ofertas económicas"
                                    :providers="providersEconomicalDocuments"/>
      <!-- SIGN AND PUBLISH -->
      <div class="row" style="margin: 20px;">
        <button :disabled="!canSignAndPublish"
                :title="`${canSignAndPublish
                ? 'Publicar los resultados'
                : 'Aún no puedes publicar los resultados. Una vez se hayan adjudicado todos los items podrán firmar y publicar.'}`"
                class="col text-center btn btn-fill btn-success btn-lg">
          <i class="fa fa-check"></i> FIRMAR Y ADJUDICAR
        </button>
      </div>
    </template>
  </div>
</template>

<script>
  import api from '../../../../../../api/biddings/documents'
  import EconomicalComparisonCard from './EconomicalComparisonCard'
  import ListFilesPerProviderCard from './ListFilesPerProviderCard'

  export default {
    components: {
      EconomicalComparisonCard,
      ListFilesPerProviderCard
    },
    data () {
      return {
        documentsObjects: [],
        items: [],
        offers: []
      }
    },
    props: {
      /**
       * Id of the current bidding.
       */
      biddingId: {
        type: String,
        default: '5b16e5d99142d57f6de4e767' // TODO: REMOVE AND SET REQUIRED TRUE
      },
      /**
       * Boolean to show or hide the economical section.
       */
      showEconomicalSection: {
        type: Boolean,
        default: true // TODO: SET DEFAULT TO FALSE
      },
      /**
       * Enable or disable the button to sign and publish the results.
       */
      canSignAndPublish: {
        type: Boolean,
        default: false
      }
    },
    created () {
      api.getAllDocuments(this.biddingId).then(res => { this.documentsObjects = res })
      // TODO: Call api and get items and offers
    },
    computed: {
      providersTechnicalDocuments () {
        return this.documentsObjects.map(documentsObject => ({
          provider: documentsObject.provider,
          documents: documentsObject.documents.technical
        }))
      },
      providersEconomicalDocuments () {
        return this.documentsObjects.map(documentsObject => ({
          provider: documentsObject.provider,
          documents: documentsObject.documents.economical
        }))
      }
    },
    methods: {
      approveProviders (providers) {
        console.log(providers)
        // TODO: Api call to approve technically the given providers
      },
      adjudicate (itemName, providers) {
        console.log(itemName, providers)
        // TODO: Api call to adjudicate the correspondent providers to the given item
      }

    }
  }
</script>

<style scoped></style>
