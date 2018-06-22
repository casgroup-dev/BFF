<template>
  <card>
    <!-- HEADERS -->
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <h3 class="title">Respuestas a las preguntas</h3>
      </div>
      <!-- BODY -->
      <div class="col-3">
      </div>
    </div>
    <div class="list-group" v-for="(question, index) in questions" :key="index">
      <div class="list-group-item list-group-item-action flex-column align-items-start">
        <p class="mb-1"><b>{{(index+1)}}.</b> {{question.question}}</p>
        <p class="mb-1">{{question.answer}}</p>
      </div>
    </div>
  </card>
</template>

<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  export default {
    name: 'QuestionsToAnswersList',
    data () {
      return {
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
    methods: {}
  }
</script>

<style scoped>
  .title {
    margin: 0 15px 10px;
    font-weight: 400;
    color: #616161;
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
</style>
