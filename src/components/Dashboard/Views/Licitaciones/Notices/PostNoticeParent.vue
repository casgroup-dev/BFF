<template>
  <TextAreaButtonCard class="content"
                      @upload="onUpload"
                      :title="'Ingrese un aviso'"/>
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
        notice: {
          error: false,
          errorMessage: ''
        },
        myDate: null
      }
    },
    props: {
      /**
       * Bidding with all of its elements. This component in particular uses the notices element of the bidding.
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
       * It gets the date at the moment of publishing the notice, to put it in the bidding.
       */
      setTextActualDate: function () {
        this.myDate = new Date()
      },
      /**
       * Event handler for the onUpload event. It calls the postNotice method and it passes the text from the child component.
       */
      onUpload: function (text) {
        this.postNotice(this.bidding.id, text)
      },
      /**
       * Makes the api call to put the notice in the bidding along with the date.
       */
      postNotice: function (biddingID, noticeText) {
        this.loading = true
        if (!noticeText.length) {
          return this.notifyError(noticeText)
        } else {
          const self = this
          self.setTextActualDate()
          usersApi.registerNotice(biddingID, noticeText, self.myDate)
            .then(function () {
              self.notifySuccess()
              console.log(self.myDate)
            })
            .catch(function () {
              self.notifyError(noticeText)
              self.notice.error = true
              self.notice.errorMessage = 'Hubo un error al tratar de publicar el aviso'
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
