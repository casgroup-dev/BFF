<template>
    <button class="btn btn-fill btn-round btn-lg btn-primary" @click="participate">
      Participar de la Licitación</button>
</template>

<script>
  import api from 'src/api/index'

  export default {
    name: 'Enter',
    data () {
      return {
        id: null,
        baseNotification: {
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          timeout: 20000
        }
      }
    },
    props: ['biddingId'],
    methods: {
      participate: function () {
        api.participateInBidding(this.biddingId)
          .then(() => {
            this.notifySuccess()
          })
          .catch(err => {
            console.error(err)
            this.notifyError()
          })
      },
      /**
       * Show a notification indicating that the file was uploaded successfully.
       * @param {String} fileName - Name of the file that was uploaded successfully.
       */
      notifySuccess () {
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>Agregado éxitosamente a la licitación </span>`},
          icon: 'fa fa-check',
          type: 'success'
        })
        this.$router.push('/')
      },
      /**
       * Show a notification as a warning indicating the the given file does not uploaded correctly.
       * @param {String} fileName - Name of the file that was not uploaded.
       */
      notifyError () {
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>Ocurrió un problema al agregarlo a la licitación <br>Inténtalo nuevamente.</span>`},
          icon: 'fa fa-exclamation',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>

</style>
