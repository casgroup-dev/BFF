<template>
  <TextAreaButtonCard class="content"
                      @upload="onUpload"
                      :title="'Ingrese su pregunta'"/>
</template>

<script>
  import TextAreaButtonCard from '../../../../UIComponents/Inputs/TextAreaButtonCard'
  import usersApi from 'src/api/index'

  export default {
    data () {
      return {
        loading: false,
        baseNotification: {
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          timeout: 3000
        },
        question: {
          error: false,
          errorMessage: ''
        }
      }
    },
    props: {
      /**
       * Bidding with all of its elements. This component in particular uses the questions element of the bidding.
       */
      bidding: {
        type: Object,
        required: true
      }
    },
    components: {
      TextAreaButtonCard
    },
    methods: {
      /**
       * Event handler for the onUpload event. It calls the postQuestion method and it passes the text from the child component.
       */
      onUpload: function (text) {
        this.postQuestion(this.bidding.id, text)
      },
      /**
       * Makes the api call to put the question in the bidding along with the answer.
       */
      postQuestion: function (biddingID, questionText) {
        this.loading = true
        if (!questionText.length) {
          return this.notifyError(questionText)
        } else {
          const self = this
          usersApi.registerQuestion(biddingID, questionText)
            .then(function () {
              self.notifySuccess()
            })
            .catch(function () {
              self.notifyError(questionText)
              self.question.error = true
              self.question.errorMessage = 'Hubo un error al tratar de publicar la pregunta'
            })
        }
      },
      /**
       * Show a notification indicating that the text was submitted correctly.
       */
      notifySuccess () {
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>Publicado correctamente</span>`},
          icon: 'fa fa-check',
          type: 'success'
        })
        this.loading = false
      },
      /**
       * Show a notification as a warning indicating that there was an error.
       */
      notifyError (text) {
        if (text.length) {
          this.$notify({
            ...this.baseNotification,
            component: {template: `<span>Ocurrió un problema<br>Inténtalo nuevamente.</span>`},
            icon: 'fa fa-exclamation',
            type: 'warning'
          })
        } else {
          this.$notify({
            ...this.baseNotification,
            component: {template: `<span>Debes ingresar un texto<br>Inténtalo nuevamente.</span>`},
            icon: 'fa fa-exclamation',
            type: 'warning'
          })
        }
        this.loading = false
      }
    }
  }
</script>

<style scoped>

</style>
