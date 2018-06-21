<template>
  <div class="content" style="overflow: paged-y;">
    <!-- HEADERS -->
    <div class="row justify-content-center">
      <h3 class="title">Preguntas Realizadas por los Proveedores</h3>
      <!-- BODY -->
      <json-excel class   = "btn btn-fill btn-finish"
                  :data   = addNumbers(questions)
                  :fields = "json_fields"
                  type    = "csv"
                  name    = "preguntas.xls">
        Descargar preguntas
      </json-excel>
    </div>
    <!-- BODY -->
    <div class="list-group" v-for="(question, index) in questions" :key="index">
      <a class="list-group-item list-group-item-action flex-column align-items-start">
        <p class="mb-1"><b>{{(index+1)}}. </b>{{question.question}}</p>
        <label class="error" v-if="answer.error">{{answer.errorMessage}}</label>
        <textarea class="form-text" title="text" v-model="question.answer" placeholder="Ingrese respuesta..."></textarea>
        <button class="btn btn-fill btn-finish" @click="postAnswer('5b182e54ab51ac1c24d49b53', '5b2bf34f092be73960eda679', question.answer)">
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
      questions: {
        type: Array,
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
        console.log(answerText)
        if (!answerText) {
          this.answer.error = true
          this.answer.errorMessage = 'Debe ingresar una respuesta!'
        } else {
          const self = this
          usersApi.registerAnswer(biddingID, questionID, answerText)
            .then(function () {
              console.log('hice el post')
              self.cancelAnswer()
              self.success = true
            })
            .catch(function () {
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
        const json = this.questions
        for (i = 0; i < this.questions.length; i++) {
          this.questions[i].number = i + 1
        }
        return json
      }
    }
  }
</script>

<style scoped>
  .col-3 {
    margin-top: 0px;
    margin-bottom: 10px;
    margin-right: auto;
  }
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
