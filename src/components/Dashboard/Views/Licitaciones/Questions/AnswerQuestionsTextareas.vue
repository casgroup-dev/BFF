<template>
  <div class="content">
    <!-- HEADERS -->
    <div class="row justify-content-center">
      <h3 class="title">Preguntas Realizadas por los Proveedores</h3>
      <!-- BODY -->
      <json-excel class   = "btn btn-fill btn-round btn-info"
                  v-if="bidding.questions.length > 0"
                  :data   = addNumbers(bidding.questions)
                  :fields = "json_fields"
                  type    = "csv"
                  name    = "preguntas.xls">
        Descargar preguntas
      </json-excel>
    </div>
    <!-- BODY -->
    <label class="label-info margin-top h4" v-if="bidding.questions.length < 1"><b>No se hicieron preguntas</b></label>
    <div class="list-group" v-for="(question, index) in bidding.questions" :key="index">
      <a class="list-group-item list-group-item-action flex-column align-items-start">
        <p class="mb-1"><b>Pregunta N°{{(index+1)}}: </b>{{question.question}}</p>
        <textarea class="form-text" title="text" v-model="question.answer" placeholder="Ingrese respuesta..."></textarea>
        <button class="btn btn-round btn-fill btn-info" @click="postAnswer(bidding.id, question.id, question.answer)">
          Publicar Respuesta
        </button>
      </a>
    </div>
  </div>
</template>

<script>
  import usersApi from 'src/api/index'
  import JsonExcel from 'vue-json-excel'

  export default {
    name: 'AnswerQuestionsTextareas',
    components: {
      JsonExcel
    },
    data () {
      return {
        answer: {
          payload: '',
          error: false,
          errorMessage: ''
        },
        success: false,
        json_fields: {
          'Numero': 'number',
          'Pregunta': 'question'
        },
        loading: false,
        baseNotification: {
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          timeout: 3000
        }
      }
    },
    props: {
      bidding: {
        type: Object,
        required: true
      }
    },
    methods: {
      /**
       * Post the answer to an specific question
       * @param {String} biddingID
       * @param {String} questionID
       * @param {String} answerText
       * @returns {Promise<any>}
       */
      postAnswer: function (biddingID, questionID, answerText) {
        if (!answerText) {
          this.answer.error = true
          this.answer.errorMessage = 'Debe ingresar una respuesta!'
          this.notifyError(answerText)
        } else {
          const self = this
          usersApi.registerAnswer(biddingID, questionID, answerText)
            .then(function () {
              self.cancelAnswer()
              self.success = true
              self.notifySuccess()
            })
            .catch(function () {
              self.notifyError(answerText)
              self.answer.error = true
              self.answer.errorMessage = 'Hubo un error al tratar de publicar la respuesta'
            })
        }
      },
      cancelAnswer: function () {
        this.answer.payload = this.answer.errorMessage = ''
        this.answer.error = false
      },
      addNumbers: function () {
        let i
        const json = this.bidding.questions
        for (i = 0; i < this.bidding.questions.length; i++) {
          this.bidding.questions[i].number = i + 1
        }
        return json
      },
      /**
       * Show a notification indicating that the text was submitted correctly.
       */
      notifySuccess () {
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>Respuesta publicada correctamente!</span>`},
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
  .title {
    margin: 0 15px 10px;
    font-weight: 400;
    color: #616161;
  }
  .content {
    margin: 5px;
    padding: 10px;
    background-color: #FFFFFF;
    /* Display */
    justify-content: space-evenly;
    flex-wrap: wrap;
    /* Border */
    --border-color: #e4e4e4;
    border: solid 1px var(--border-color);
    border-radius: 5px;
  }

  textarea {
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  button {
    margin: 10px auto;
  }

  .form-text {
    width: 70%;
    height: 50%;
  }

  label.error {
    color: #ff0000
  }
</style>
