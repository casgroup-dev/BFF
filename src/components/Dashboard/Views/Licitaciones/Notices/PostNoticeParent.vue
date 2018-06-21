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
        biddingID: '',
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
    components: {
      TextAreaButtonCard
    },
    methods: {
      setTextActualDate () {
        this.myDate = new Date().toISOString().split('T')[0]
      },
      onUpload: function (text, myDate) {
        this.postNotice(this.biddingID, text, myDate)
      },
      postNotice: function (biddingID, noticeText, noticeDate) {
        this.loading = true
        if (!noticeText.length) {
          return this.notifyError(noticeText)
        } else {
          const self = this
          usersApi.registerNotice(biddingID, noticeText, noticeDate)
            .then(function () {
              self.setTextActualDate()
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
