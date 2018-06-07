<template>
  <div class="container-fluid">
    <!-- TECHNICAL OFFERS -->
    <list-files-per-provider-card :providers="providersTechnicalDocuments" title="Ofertas técnicas"/>
    <!-- ECONOMICAL OFFERS -->
    <list-files-per-provider-card title="Anexos ofertas económicas" :providers="providersEconomicalDocuments"/>
  </div>
</template>

<script>
  import api from '../../../../../../api/biddings/documents'
  import ListFilesPerProviderCard from './ListFilesPerProviderCard'

  export default {
    components: {
      ListFilesPerProviderCard
    },
    data () {
      return {
        providers: []
      }
    },
    props: {
      /**
       * Id of the current bidding.
       */
      biddingId: {
        type: String,
        default: '5b16e5d99142d57f6de4e767' // TODO: REMOVE AND SET REQUIRED TRUE
      }
    },
    created () {
      api.getAllDocuments(this.biddingId).then(res => { this.providers = res })
    },
    computed: {
      providersTechnicalDocuments () {
        return this.providers.map(provider => ({provider: provider.provider, documents: provider.documents.technical}))
      },
      providersEconomicalDocuments () {
        return this.providers.map(provider => ({provider: provider.provider, documents: provider.documents.economical}))
      }
    }
  }
</script>

<style scoped>

</style>
