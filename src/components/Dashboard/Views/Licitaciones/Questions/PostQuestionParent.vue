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
        biddingID: '5b182e54ab51ac1c24d49b53',
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
    components: {
      TextAreaButtonCard
    },
    methods: {
      onUpload: function (text) {
        this.postQuestion(this.biddingID, text)
      },
      postQuestion: function (biddingID, questionText) {
        this.loading = true
        if (!questionText.length) {
          return this.notifyError(questionText)
        } else {
          const self = this
          usersApi.registerQuestion(biddingID, questionText)
            .then(function () {
              self.notifySuccess()
              console.log(self.myDate)
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
