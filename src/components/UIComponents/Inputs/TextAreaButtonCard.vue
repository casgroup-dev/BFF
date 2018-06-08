<template>
  <card>
    <h4 slot="header" class="title" :style="{fontSize: titleSize}">{{ title }}</h4>
    <div class="form-group">
      <textarea class="form-control" title="text" v-model="text" placeholder="Ingrese texto..."></textarea>
    </div>
    <div class="stats col-xs-9" slot="footer">
      <clip-loader :loading="loading" color="#1DC7EA" class="clip-loader"/>
      <button v-if="!loading" class="btn btn-fill btn-round btn-success" @click="postText">
        {{buttonLabel}}
      </button>
    </div>
  </card>
</template>

<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import ClipLoader from 'vue-spinner/src/ClipLoader'

  export default {
    data () {
      return {
        loading: false,
        text: '',
        baseNotification: {
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          timeout: 20000
        }
      }
    },
    components: {
      Card,
      ClipLoader
    },
    props: {
      /**
       * Title of the input card.
       */
      title: {
        type: String,
        default: 'Please provide a title'
      },
      /**
       * Size in pixels of the title.
       */
      titleSize: {
        type: String,
        default: '30px'
      },
      /**
       * Label of the button.
       */
      buttonLabel: {
        type: String,
        default: 'Publicar'
      }
    },
    methods: {
      // TODO: se clickeo el boton y se debe hacer POST del notice al endpoint
      postText: function () {
        this.loading = true
        if (this.text.length) return this.notifySuccess()
        else return this.notifyError()
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
      notifyError () {
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>Ocurrió un problema<br>Inténtalo nuevamente.</span>`},
          icon: 'fa fa-exclamation',
          type: 'warning'
        })
        this.loading = false
      }
    }
  }
</script>

<style scoped>

  .title {
    margin: 0 10px 10px;
    font-weight: 400;
    color: #616161;
  }

  .form-group {
    align-self: center;
    justify-content: space-evenly;
  }

</style>
