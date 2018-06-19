<template>
  <card class="text-area-card">
    <h4 slot="header" class="title" :style="{fontSize: titleSize}">{{ title }}</h4>
    <div class="form-group">
      <textarea class="form-text" title="text" v-model="text" placeholder="Ingrese texto..."></textarea>
    </div>
    <div class="stats col-xs-9" slot="footer">
      <clip-loader :loading="loading" color="#1DC7EA" class="clip-loader"/>
      <button v-if="!loading" class="btn btn-fill btn-round btn-success" @click="postText('5b182e54ab51ac1c24d49b53', text)">
        {{buttonLabel}}
      </button>
    </div>
  </card>
</template>

<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import ClipLoader from 'vue-spinner/src/ClipLoader'
  import usersApi from 'src/api/index'

  export default {
    data () {
      return {
        loading: false,
        text: '',
        baseNotification: {
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          timeout: 2000
        },
        myDate: null,
        question: {
          error: false,
          errorMessage: ''
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
      postText: function (biddingID, questionText) {
        console.log(questionText)
        this.loading = true
        if (!this.text.length) {
          return this.notifyError()
        } else {
          const self = this
          usersApi.registerQuestion(biddingID, questionText)
            .then(function () {
              this.setTextActualDate()
              this.notifySuccess()
              console.log(this.myDate)
            })
            .catch(function () {
              self.notifyError()
              self.question.error = true
              self.question.errorMessage = 'Hubo un error al tratar de publicar la pregunta'
            })
        }
      },
      setTextActualDate () {
        this.myDate = new Date().toISOString().split('T')[0]
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
        if (this.text.length) {
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

  .text-area-card {
    /* Border */
    --border-color: #e4e4e4;
    border: solid 1px var(--border-color);
    border-radius: 5px;
  }

  .title {
    margin: 0 10px 10px;
    font-weight: 400;
    color: #616161;
  }

  .form-group {
    align-self: center;
    justify-content: space-evenly;
  }

  .form-text {
    width: 100%;
    height: 50%;
  }

</style>
