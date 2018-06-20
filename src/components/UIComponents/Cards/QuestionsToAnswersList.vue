<template>
  <card>
    <!-- HEADERS -->
    <h3 class="title">Preguntas Realizadas por los Proveedores</h3>
    <!-- BODY -->
    <div class="list-group" v-for="(question, index) in questions" :key="index">
      <div class="list-group-item list-group-item-action flex-column align-items-start">
        <p class="mb-1">{{question.question}}</p>
        <label class="error" v-if="answer.error">{{answer.errorMessage}}</label>
        <textarea class="form-text" title="text" v-model="question.answer" placeholder="Ingrese respuesta..."></textarea>
        <button class="btn btn-fill btn-finish" @click="postAnswer('5b182e54ab51ac1c24d49b53','5b182e54ab51ac1c24d49b58', question.answer)">
          Publicar Respuesta
        </button>
      </div>
    </div>
  </card>
</template>

<script>
  import usersApi from 'src/api/index'
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  export default {
    name: 'QuestionsToAnswersList',
    data () {
      return {
        answer: {
          payload: '',
          error: false,
          errorMessage: ''
        },
        success: false
      }
    },
    components: {
      Card
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
        if (!answerText) {
          this.answer.error = true
          this.answer.errorMessage = 'Debe ingresar una respuesta!'
        } else {
          const self = this
          usersApi.registerAnswer(biddingID, questionID, answerText)
            .then(function () {
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
        this.answer.payload = ''
        this.answer.error = this.answer.errorMessage = false
      }
    }
  }
</script>

<style scoped>
  .card {
    width: -moz-fit-content;
    text-align: center;
  }

  .fa-trophy {
    color: gold;
    text-shadow: 5px 0px #848484;
  }

  .fa-legal {
    color: brown;
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
    margin: 20px auto;
    padding: 10px;
  }

  .form-text {
    width: 70%;
    height: 50%;
  }

  label.error {
    color: #ff0000
  }
</style>
