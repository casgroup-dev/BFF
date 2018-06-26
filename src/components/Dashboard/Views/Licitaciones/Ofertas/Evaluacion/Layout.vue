<template>
  <div class="container-fluid">
    <template v-if="!bidding.publishedResults">
      <!-- TECHNICAL OFFERS -->
      <list-files-per-provider-card title="Ofertas técnicas"
                                    :providers="providersTechnicalDocuments"
                                    show-approvement
                                    @approve="approveProviders"/>
      <template v-if="showEconomicalSection">
        <!-- ECONOMICAL COMPARISON -->
        <economical-comparison-card :economicalForm="bidding.economicalForm"
                                    :economicalFormAnswers="economicalFormAnswers"
                                    :users="bidding.users"
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
                  @click="publishResults"
                  class="col text-center btn btn-fill btn-success btn-lg">
            <i class="fa fa-check"></i> FIRMAR Y ADJUDICAR
          </button>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="row text-center">
        <div class="col">
          <h3>Los resultados para esta licitación ya fueron publicados exitosamente.</h3>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import api from '../../../../../../api/biddings/approvement'
  import EconomicalComparisonCard from './EconomicalComparisonCard'
  import ListFilesPerProviderCard from './ListFilesPerProviderCard'

  export default {
    components: {
      EconomicalComparisonCard,
      ListFilesPerProviderCard
    },
    data () {
      return {
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
      /**
       * The bidding object coming from the backend.
       */
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
        default: true
      }
    },
    computed: {
      providersTechnicalDocuments () {
        return this.reduceDocumentsToType(this.bidding.users, 'technicals')
      },
      providersEconomicalDocuments () {
        return this.reduceDocumentsToType(this.bidding.users, 'economicals')
      },
      economicalFormAnswers () {
        return this.bidding.users.map(participant => participant.economicalFormAnswers.map(answers => ({
          ...answers,
          provider: participant.user.company.businessName
        }))).reduce((acc, cur) => acc.concat(cur), [])
      }
    },
    methods: {
      /**
       * Reduce all the documents from each user to a single object of the company.
       * Type must be 'economicals' or 'technicals'.
       */
      reduceDocumentsToType (users, type) {
        if (type !== 'technicals' && type !== 'economicals') throw new Error(`Type must be 'economicals' or 'technicals'`)
        return users.reduce((accumulatedResult, currentParticipant) => {
          if (currentParticipant.user.company &&
            currentParticipant.user.company.businessName !== 'CAS compañía de asesorías y servicios SPA') {
            // If the current users' company is not in the accumulated result, add it
            const currentBusinessName = currentParticipant.user.company.businessName
            let providerDocuments = accumulatedResult.find(a => a.provider === currentBusinessName)
            if (!providerDocuments) {
              providerDocuments = {provider: currentBusinessName, documents: []}
              accumulatedResult.push(providerDocuments)
            }
            // Concat to the accumulated documents of the provider company
            providerDocuments.documents = providerDocuments.documents.concat(currentParticipant.documents[type])
            // Set approved if any user is approved
            if (currentParticipant.approved.technically) providerDocuments.approved = true
          }
          return accumulatedResult
        }, [])
      },
      approveProviders (providers) {
        // Get only the businessNames
        providers = providers.map(p => p.provider)
        api.approve(this.bidding.id, api.types.technically, providers)
          .then(() => {
            let message = providers.length
              ? `Proveedores aprobados técnicamente:<br>${providers.map(p => `- ${p}`).join('<br>')}.`
              : `Se guardó que ningún proveedor está aprobado aún.`
            this.notifySuccess(message)
          })
          .catch(this.notifyError)
      },
      adjudicate (itemName, adjudications) {
        api.approve(this.bidding.id, api.types.economically, {itemName, adjudications})
          .then(() => {
            let message = adjudications.some(adj => adj.adjudicated) ? `Se adjudicó y se ` : 'Se '
            message += `guardaron los comentarios para los proveedores del item <strong>${itemName}</strong>.`
            this.notifySuccess(message)
          })
          .catch(this.notifyError)
      },
      /**
       * Does the api call to publish the results of this bidding.
       */
      publishResults () {
        api.publish(this.bidding.id)
          .then(() => this.notifySuccess(`Resultados publicados exitosamente.`))
          .catch(err => this.notifyError(err, `Lo siento, no pudimos publicar los resultados, inténtalo nuevamente más tarde.`))
      },
      /**
       * Show a notification success message.
       * @param {String} message
       */
      notifySuccess (message) {
        this.$notify({
          ...this.baseNotification,
          component: {
            template:
              `<span>${message}</span>`
          },
          icon: 'fa fa-check',
          type: 'success'
        })
      },
      /**
       * Show a notification as a warning indicating the the form does not uploaded correctly.
       */
      notifyError (err, msg) {
        console.error(err)
        msg = msg || `<span>Ocurrió un problema aprobando a los proveedores, por favor verifica que tangas conexión a internet.<br>Inténtalo nuevamente.</span>`
        this.$notify({
          ...this.baseNotification,
          component: {template: msg},
          icon: 'fa fa-exclamation',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped></style>
