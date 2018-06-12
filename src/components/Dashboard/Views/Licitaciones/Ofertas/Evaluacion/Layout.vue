<template>
  <div class="container-fluid">
    <!-- TECHNICAL OFFERS -->
    <list-files-per-provider-card title="Ofertas técnicas"
                                  :providers="providersTechnicalDocuments"
                                  show-approvement
                                  @approve="approveProviders"/>
    <template v-if="showEconomicalSection">
      <!-- ECONOMICAL COMPARISON -->
      <economical-comparison-card :economicalForm="bidding.economicalForm"
                                  :economicalFormAnswers="economicalFormAnswers"
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
  import apiDocuments from '../../../../../../api/biddings/documents'
  import apiApprovement from '../../../../../../api/biddings/approvement'
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
        offers: [],
        baseNotification: {
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          timeout: 20000
        }
      }
    },
    props: {
      bidding: {
        type: Object,
        required: true
      },
      /**
       * Boolean to show or hide the economical section.
       */
      showEconomicalSection: {
        type: Boolean,
        default: false
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
      apiDocuments.getAllDocuments(this.bidding.id).then(res => { this.documentsObjects = res })
    },
    computed: {
      providersTechnicalDocuments () {
        // TODO: Send if it is approved or not
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
      },
      economicalFormAnswers () {
        return this.bidding.users.map(user => user.economicalFormAnswers.map(answers => ({
          ...answers,
          provider: user.company
        })))
          .reduce((acc, cur) => acc.concat(cur), [])
      }
    },
    methods: {
      approveProviders (providers) {
        providers = providers.map(p => p.provider)
        apiApprovement.approve(this.bidding.id, 'technically', providers.map(p => p.provider))
          .then(() => this.notifySuccess(`Proveedores aprobados: ${providers.join(', ')}.`))
          .catch(this.notifyError)
      },
      adjudicate (itemName, providers) {
        console.log(itemName, providers)
        // TODO: Api call to adjudicate the correspondent providers to the given item
      },
      /**
       * Show a notification success message.
       * @param {String} message
       */
      notifySuccess (message) {
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>${message}</span>`},
          icon: 'fa fa-check',
          type: 'success'
        })
      },
      /**
       * Show a notification as a warning indicating the the form does not uploaded correctly.
       */
      notifyError (err) {
        console.error(err)
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>Ocurrió un problema aprobando a los proveedores, por favor verifica que tangas conexión a internet.<br>Inténtalo nuevamente.</span>`},
          icon: 'fa fa-exclamation',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped></style>
